import { Component, OnInit, ViewChild, OnDestroy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Subject, Observable, combineLatest } from 'rxjs';
import { Titular } from '../../../../models/titulares/titular';
import { FormControl } from '@angular/forms';
//import { ImpuestosTsgService } from '../../../services/impuestos_tsg/impuestos_tsg.service';
import { TranslationService } from '../../../../services/translation/translation.service';
import { takeUntil, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Deudores } from 'app/models/titulares/deudores';
import { ExcelService } from 'app/services/excel/excel.service';
import { TitularesService } from 'app/services/titulares/titulares.service';
import { AuthenticationService } from 'app/services/authentication/authentication.service';
import { Zona } from 'app/models/zonas/zona';
import { ZonaService } from 'app/services/zonas/zonas.service';
import { SweetAlert2Helper } from 'app/helpers/sweet-alert-2.helper';
import * as _ from 'lodash';
//import { ExcelService } from '../../../services/excel/excel.service';
//import { AuthenticationService } from "../../../services/authentication/authentication.service";

@Component({
  selector: 'deudores-zonas-table',
  templateUrl: './deudores-zonas-table.component.html',
  styleUrls: ['./deudores-zonas-table.component.scss']
})
export class DeudoresZonasTableComponent implements OnInit {
  @ViewChild(DatatableComponent, {static: false}) table: DatatableComponent;
  @Input() forms$: Observable<Deudores[]>;
  @Output() onView: EventEmitter<Deudores>;
  searchInput: FormControl;
  ZonaId: FormControl;
  zonas: Zona[];

  private _unsubscribeAll: Subject<any>;
  messages = {
        emptyMessage: 'No se encontraron registros'
    };
  searchSubject: Subject<string>;

  filteredRows: Observable<Deudores[]>;
  deudores:Deudores[] = [];
  isContribuyente: boolean;
  DepartamentoId: string = '66040'; //oran
  apiResponse: any = [];
  selected: string;
  searchText: string = "";

  constructor(private _translationService: TranslationService,
    private _ImpuestosTsgService: TitularesService,
    private _excelService: ExcelService,
    private _authenticationService: AuthenticationService,
    private _zonaService: ZonaService,
    private _sweetAlert2Helper: SweetAlert2Helper,
    ) { 
      this._unsubscribeAll = new Subject();
        this.onView = new EventEmitter<Deudores>();        
        this.messages.emptyMessage = this._translationService.noDataAvailable;
        this.zonas = [];
        this.searchInput = new FormControl('');
        this.ZonaId = new FormControl('');
        /*this.searchInput.valueChanges
                .pipe(
                    takeUntil(this._unsubscribeAll),
                    debounceTime(500),
                    distinctUntilChanged()
                )
                .subscribe(value => {
                    this.search(value);
                });*/
    }

  ngOnInit(): void {
    console.log('datosss ',this.forms$);
    this.filteredRows = this.forms$;
    const currentUser = this._authenticationService.usuario;    
    this.isContribuyente = (currentUser.Rol.Id == 'COD_CONTRIBUYENTE')? true: false;    
    this.selected = "ID_ALL";
    this.getData();
  }

  getData(): void {
    const $combineLatest = combineLatest([
      this._zonaService.zonaByDepartamento(this.DepartamentoId)
    ]);
    $combineLatest.pipe(takeUntil(this._unsubscribeAll)).subscribe(
      ([zonas]) => {
          console.log(` getData > zonas`, zonas);
          this.zonas = zonas;
      },
      (error) => {
          console.error(` getData > Error`, error);
          this._sweetAlert2Helper.error(
              "Error",
              "Ocurrió un error obteniendo datos.",
              null,
              true
          );
      });
  }

  onChange($event:any){
    console.log('dato filtro ',$event.value);
    this.filteredRows = this.forms$.pipe(map((response: any) => {
        return response.filter(c => (c.ZonaId.includes($event.value))
        //|| (c.UserName && c.UserName.toUpperCase().includes(value)) || (c.DocumentNumber && c.DocumentNumber.toUpperCase().includes(value))
        );
      })
    );

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

    if(this.forms$ && value!= ''){
        this.filteredRows = this.forms$.pipe(map((response: any) => {
            return response.filter(c => (c && c.sApellido.toUpperCase().includes(value) 
              || (c.sNombre.toUpperCase().includes(value))
            //|| (c.UserName && c.UserName.toUpperCase().includes(value)) || (c.DocumentNumber && c.DocumentNumber.toUpperCase().includes(value))
            ));
        }));
    }
  }

  view(row: Deudores):void{
    this.onView.emit(row);
  }

  buscar():void{
    this.searchText = this.searchInput.value;
    this.ZonaId = this.ZonaId.value;
    if(this.forms$ && this.searchText != ''){
        this.filteredRows = this.forms$.pipe(map((response: any) => {
            return response.filter(c => ((c && c.sApellido.toUpperCase().includes(this.searchText) 
              || (c.sNombre.toUpperCase().includes(this.searchText)) && (c.ZonaId.includes(this.ZonaId)))
            //|| (c.UserName && c.UserName.toUpperCase().includes(value)) || (c.DocumentNumber && c.DocumentNumber.toUpperCase().includes(value))
            ));
        }));
    }
  }

  downloadPDF(): void{
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
      docResult.save(`${new Date().toISOString()}_deudores.pdf`);
    });
  }
}
