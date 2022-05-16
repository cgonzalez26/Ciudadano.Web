import { Component, OnInit, ViewChild, OnDestroy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Subject, Observable } from 'rxjs';
import { Usuario } from './../../../models/usuarios/usuario.model';
import { FormControl } from '@angular/forms';
import { UsuariosService } from './../../../services/usuarios/usuarios.service';
import { TranslationService } from './../../../services/translation/translation.service';
import { takeUntil, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { SweetAlert2Helper } from 'app/helpers/sweet-alert-2.helper';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'usuarios-table',
  templateUrl: './usuarios-table.component.html',
  styleUrls: ['./usuarios-table.component.scss']
})
export class UsuariosTableComponent implements OnInit, OnChanges, OnDestroy  {
  @ViewChild(DatatableComponent, {static: false}) table: DatatableComponent;
  @BlockUI('BlockUsuario') dialogBlockUI: NgBlockUI;    
  @Input() forms$: Observable<Usuario[]>;
  @Output() onAdd: EventEmitter<void>;
  @Output() onEdit: EventEmitter<any>;
  @Output() onDelete: EventEmitter<any>;
  @Output() onActivate: EventEmitter<any>;

  searchInput: FormControl;
  private _unsubscribeAll: Subject<any>;
  messages = {
        emptyMessage: 'No se encontraron registros'
    };
  searchSubject: Subject<string>;

  filteredRows: Observable<Usuario[]>;

  constructor(private _translationService: TranslationService,
    private _usuariosService: UsuariosService,
    private _sweetAlert2Helper: SweetAlert2Helper,
  ) { 
    this._unsubscribeAll = new Subject();
    this.onAdd = new EventEmitter<void>();
    this.onEdit = new EventEmitter<any>();
    this.onDelete = new EventEmitter<any>();
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
    console.log('usuarios table ',this.forms$);
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
            return response.filter(c => (c && c.Apellidos && c.Nombres.toUpperCase().includes(value) /*|| (c.Institucion && c.Institucion.toUpperCase().includes(value))*/
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

  remove(row: Usuario): void {
    this._sweetAlert2Helper.question('Atención', '¿Desea eliminar el Usuario ' + row.UsuarioNombre + '?', 'SI', 'NO', () => {
      this.dialogBlockUI.start();
      this._usuariosService.delete(row.Id).subscribe(response => {              
          this.onDelete.emit();
          this._usuariosService.deleteRow(row, 'Id');
          this._sweetAlert2Helper.success('Exito', 'Se ha eliminado el Usuario', null);
          this.dialogBlockUI.stop();
        }, error => {
          this.dialogBlockUI.stop();
        });
    }, () => {
    });         
}


}
