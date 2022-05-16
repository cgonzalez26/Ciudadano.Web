import { ImpuestosInmService } from './../../../services/impuestos_inm/impuestos_inm.service';
import { ImpuestosInm } from './../../../models/impuestos_inm/impuestos_inm';
import { Component, Inject, ViewChild, ElementRef, OnInit } from '@angular/core';
/*import { MatDialogRef, MAT_DIALOG_DATA, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatDatepicker } from '@angular/material';*/
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
//import { MatDatepicker, } from '@angular/material/datepicker';
//import { MAT_DATE_LOCALE, MAT_DATE_FORMATS,DateAdapter } from '@angular/material/core';

import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { isEqual, omit } from 'lodash';
import { SweetAlert2Helper } from 'app/helpers/sweet-alert-2.helper';
import { KeyValue } from '@angular/common';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { Observable, combineLatest } from 'rxjs';
import * as moment from 'moment';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Titular } from 'app/models/titulares/titular';
import { AuthenticationService } from "../../../services/authentication/authentication.service";
import { TitularesService } from './../../../services/titulares/titulares.service';

export interface DialogData {
  titleTranslationCode: string;
  action: string;
  form: ImpuestosInm;
}

@Component({
  selector: 'impuestos_inm-dialog',
  templateUrl: './impuestos_inm-dialog.component.html',
  styleUrls: ['./impuestos_inm-dialog.component.scss']
})
export class ImpuestosInmDialogComponent implements OnInit {
  @BlockUI('form-dialog-imp-inm') dialogBlockUI: NgBlockUI;
  dialogForm: FormGroup;
  title: string;
  action: string;
  form: ImpuestosInm; 
  rowCopy: ImpuestosInm = new ImpuestosInm();
  saveCallback: (any) => void;
  tipoestablecimientos : any[];
  diaVencimiento: string="15";
  titular: Titular;
  
  constructor(
    public _matDialogRef: MatDialogRef<ImpuestosInmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _dialogData: DialogData,
    private _formBuilder: FormBuilder,
    private _sweetAlert2Helper: SweetAlert2Helper,
    private _establecimientosService: ImpuestosInmService,
    private _titularesService: TitularesService,
    private _authenticationService: AuthenticationService
  ) { 
    this.dialogBlockUI.start('Cargando...');
    this.title = _dialogData.titleTranslationCode ? _dialogData.titleTranslationCode : 'COMMON.NOT_AVAILABLE';
    this.action = _dialogData.action ? _dialogData.action : 'add';
    this.form = _dialogData.form ? _dialogData.form : new ImpuestosInm();   
    this.rowCopy = JSON.parse(JSON.stringify(this.form));
    this.dialogForm = this.createDialogForm();
    this.saveCallback = null;
    this.dialogBlockUI.stop();
  }

  ngOnInit(): void {
    this.dialogBlockUI.start('Cargando...');
    const currentUser = this._authenticationService.usuario;
    combineLatest(
      this._titularesService.getByNroDocumento(currentUser.sNroDocumento),
    ).subscribe(      
      ([_titu]) => {
            this.titular = _titu;             
            this.dialogBlockUI.stop();
        }, error => {
            this._sweetAlert2Helper.error('Error', 'Ocurrió un error recuperando los formularios. Detalle: ' + error.Message, null, false);
            this.dialogBlockUI.stop();
      });  
  }

  createDialogForm(): FormGroup {
    const formGroup = this._formBuilder.group({
      sDominio: [this.form.sCatastro, [Validators.required]],
      iAnio: [this.form.iAnio],
      iPeriodo: [this.form.iPeriodo],
      //TipoEstablecimientoId: [this.form.TipoEstablecimientoId],
    });        
    return formGroup;
  }

  cancel() {
    this._matDialogRef.close();      
  }
  
  printBoleta(row){     
    
    const DATA2 = document.getElementById('divPrintBoleta');
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
      docResult.save(`${new Date().toISOString()}_boleta_imp_inm.pdf`);
    });
  }

}
