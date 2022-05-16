import { Component, OnInit, ViewChild, OnDestroy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ElementRef } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Subject, Observable } from 'rxjs';
import { ImpuestosAut } from '../../../models/impuestos_aut/impuestos_aut';
import { FormControl } from '@angular/forms';
import { ImpuestosAutService } from '../../../services/impuestos_aut/impuestos_aut.service';
import { TranslationService } from '../../../services/translation/translation.service';
import { takeUntil, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ExcelService } from '../../../services/excel/excel.service';
import * as XLSX from 'xlsx';
import { AuthenticationService } from "../../../services/authentication/authentication.service";
import { ImpuestosAutBoletaComponent } from './impuestos-aut-boleta/impuestos-aut-boleta.component';

@Component({
  selector: 'impuestos_aut-table',
  templateUrl: './impuestos_aut-table.component.html',
  styleUrls: ['./impuestos_aut-table.component.scss']
})
export class ImpuestosAutTableComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild(DatatableComponent, {static: false}) table: DatatableComponent;
  //Vamos a usar el Component para imprimr Boleta
  @ViewChild(ImpuestosAutBoletaComponent) ImpuestosAutBoleta : ImpuestosAutBoletaComponent;

  @Input() forms$: Observable<ImpuestosAut[]>;
  @Output() onAdd: EventEmitter<void>;
  @Output() onEdit: EventEmitter<any>;
  @Output() onActivate: EventEmitter<any>;

  searchInput: FormControl;
  private _unsubscribeAll: Subject<any>;
  messages = {
        emptyMessage: 'No se encontraron registros'
    };
  searchSubject: Subject<string>;

  filteredRows: Observable<ImpuestosAut[]>;

  impuestos_aut:ImpuestosAut[] = [];
  
  isContribuyente: boolean;

  impuesto_aut_padre: ImpuestosAut;

  constructor(
      private _translationService: TranslationService,
      private _impuestosautService: ImpuestosAutService,
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
    console.log(currentUser.Rol.Id);
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
            return response.filter(c => (c && c.sDominio.toUpperCase().includes(value) /*|| (c.Institucion && c.Institucion.toUpperCase().includes(value))*/
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

  generarPDF(){
    html2canvas(document.getElementById('tableForm'), {
        // Opciones
        allowTaint: true,
        useCORS: false,
        // Calidad del PDF
        scale: 1
      }).then(function(canvas) {
      var img = canvas.toDataURL("image/png");
      var doc = new jsPDF();
      doc.addImage(img,'PNG',7, 20, 195, 105);
      doc.save('impuestos_aut2.pdf');
    });
  }

  

  downloadPDF() {
    const DATA = document.getElementById('tableForm');    
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.setFontSize(10);
    doc.text("Impuestos del Automotor - Estado de Deuda",100,10);
    const options = {
      background: 'white',
      scale: 3,    
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
      docResult.save(`${new Date().toISOString()}_impuestos_aut.pdf`);
    });
  }

  data: any = [];
  downloadExcel(){
    this.forms$.subscribe(
      imp => {
        this.impuestos_aut = imp;
        this.impuestos_aut.forEach( impuesto => {          
             this.data.push({
                Dominio: impuesto.sDominio,
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
    this._excelService.exportAsExcelFile(this.data, `impuestos_aut`);
  }

  
  printBoleta(row){     
    this.ImpuestosAutBoleta.impuesto_aut = row;         
    /*const DATA2 = document.getElementById('printBoleta');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };

    //console.log('print boleta ->',row,'html  ',DATA2);
    html2canvas(DATA2, options).then((canvas) => {

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
      docResult.save(`${new Date().toISOString()}_boleta_imp_aut.pdf`);
    });*/
  }
}
