import { Component, OnInit, ViewChild, OnDestroy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Subject, Observable } from 'rxjs';
import { ImpuestosInm } from '../../../models/impuestos_inm/impuestos_inm';
import { FormControl } from '@angular/forms';
import { ImpuestosInmService } from '../../../services/impuestos_inm/impuestos_inm.service';
import { TranslationService } from '../../../services/translation/translation.service';
import { takeUntil, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ExcelService } from '../../../services/excel/excel.service';
import { AuthenticationService } from "../../../services/authentication/authentication.service";

@Component({
  selector: 'impuestos_inm-table',
  templateUrl: './impuestos_inm-table.component.html',
  styleUrls: ['./impuestos_inm-table.component.scss']
})
export class ImpuestosInmTableComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild(DatatableComponent, {static: false}) table: DatatableComponent;
  @Input() forms$: Observable<ImpuestosInm[]>;
  @Output() onAdd: EventEmitter<void>;
  @Output() onEdit: EventEmitter<any>;
  @Output() onActivate: EventEmitter<any>;

  searchInput: FormControl;
  private _unsubscribeAll: Subject<any>;
  messages = {
        emptyMessage: 'No se encontraron registros'
    };
  searchSubject: Subject<string>;

  filteredRows: Observable<ImpuestosInm[]>;
  impuestos_inm:ImpuestosInm[] = [];
  isContribuyente: boolean;

  constructor(
      private _translationService: TranslationService,
      private _ImpuestosInmService: ImpuestosInmService,
      private _excelService: ExcelService,
      private _authenticationService: AuthenticationService,) { 
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
    const currentUser = this._authenticationService.usuario;    
    this.isContribuyente = (currentUser.Rol.Id == 'COD_CONTRIBUYENTE')? true: false;
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
            return response.filter(c => (c && c.sCatastro.toUpperCase().includes(value) /*|| (c.Institucion && c.Institucion.toUpperCase().includes(value))*/
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

  downloadPDF() {
    const DATA = document.getElementById('tableForm');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_impuestos_inm.pdf`);
    });
  }

  data: any = [];
  downloadExcel(){
    this.forms$.subscribe(
      imp => {
        this.impuestos_inm = imp;
        this.impuestos_inm.forEach( impuesto => {          
             this.data.push({
                Catastro: impuesto.sCatastro,
                Año: impuesto.iAnio,
                Periodo: impuesto.iPeriodo,
                Monto_Pagar: impuesto.nMonto_Pagar, 
                dFecha_Pago: impuesto.dFecha_Pago,
                Pago: impuesto.nPago,
                Saldo: impuesto.nSaldo
             })
          })
      }
    );      
    //console.log(`array impuestos `,this.impuestos_aut);
    this._excelService.exportAsExcelFile(this.data, `impuestos_inm`);
  }
}
