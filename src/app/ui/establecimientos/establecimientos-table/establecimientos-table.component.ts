import { Component, OnInit, ViewChild, OnDestroy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Subject, Observable } from 'rxjs';
import { Establecimiento } from './../../../models/establecimientos/establecimiento';
import { FormControl } from '@angular/forms';
import { EstablecimientosService } from './../../../services/establecimientos/establecimientos.service';
import { TranslationService } from './../../../services/translation/translation.service';
import { takeUntil, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'establecimientos-table',
  templateUrl: './establecimientos-table.component.html',
  styleUrls: ['./establecimientos-table.component.scss']
})
export class EstablecimientosTableComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild(DatatableComponent, {static: false}) table: DatatableComponent;
  @Input() forms$: Observable<Establecimiento[]>;
  @Output() onAdd: EventEmitter<void>;
  @Output() onEdit: EventEmitter<any>;
  @Output() onActivate: EventEmitter<any>;

  searchInput: FormControl;
  private _unsubscribeAll: Subject<any>;
  messages = {
        emptyMessage: 'No se encontraron registros'
    };
  searchSubject: Subject<string>;

  filteredRows: Observable<Establecimiento[]>;
  constructor(  
    private _translationService: TranslationService,
    private _establecimientosService: EstablecimientosService,) 
    { 
      this._unsubscribeAll = new Subject();
      this.onAdd = new EventEmitter<void>();
      this.onEdit = new EventEmitter<any>();
      this.onActivate = new EventEmitter<any>();
      this.messages.emptyMessage = this._translationService.noDataAvailable;
      this.searchInput = new FormControl('');
      this.searchInput.valueChanges
              .pipe(
                  takeUntil(this._unsubscribeAll),
                  debounceTime(500),
                  distinctUntilChanged()
              )
              .subscribe(value => {
                  this.search(value);
              });
    }

  ngOnInit(): void {
    this.filteredRows = this.forms$;
  }

  ngOnChanges() {
    this.searchInput.setValue('');
  }

  ngOnDestroy() {
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }

  search(value: string) {
    value = value.toUpperCase();

    if(this.forms$){
        this.filteredRows = this.forms$.pipe(map((response: any) => {
            return response.filter(c => (c && c.Nombre.toUpperCase().includes(value) /*|| (c.Institucion && c.Institucion.toUpperCase().includes(value))*/
            //|| (c.UserName && c.UserName.toUpperCase().includes(value)) || (c.DocumentNumber && c.DocumentNumber.toUpperCase().includes(value))
            ));
        }));
    }
  }

  add() {
    this.onAdd.emit();
  }

  edit(row) {
      this.onEdit.emit(row);
  }

  activate(row) {
      if (event.type == 'dblclick') {
          this.onActivate.emit(row.row);
      }        
  }

}
