import { EstablecimientosService } from './../../../services/establecimientos/establecimientos.service';
import { Establecimiento } from './../../../models/establecimientos/establecimiento';
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

export interface DialogData {
  titleTranslationCode: string;
  action: string;
  form: Establecimiento; //Athlete;
}

@Component({
  selector: 'establecimientos-dialog',
  templateUrl: './establecimientos-dialog.component.html',
  styleUrls: ['./establecimientos-dialog.component.scss']
})
export class EstablecimientosDialogComponent implements OnInit {
  @BlockUI('form-dialog-establecimiento') dialogBlockUI: NgBlockUI;
  dialogForm: FormGroup;
  title: string;
  action: string;
  form: Establecimiento; 
  rowCopy: Establecimiento = new Establecimiento();
  saveCallback: (any) => void;
  tipoestablecimientos : any[];

  constructor(
    public _matDialogRef: MatDialogRef<EstablecimientosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _dialogData: DialogData,
    private _formBuilder: FormBuilder,
    private _sweetAlert2Helper: SweetAlert2Helper,
    private _establecimientosService: EstablecimientosService,        
  ) { 
    this.dialogBlockUI.start('Cargando...');
    this.title = _dialogData.titleTranslationCode ? _dialogData.titleTranslationCode : 'COMMON.NOT_AVAILABLE';
    this.action = _dialogData.action ? _dialogData.action : 'add';
    this.form = _dialogData.form ? _dialogData.form : new Establecimiento();   
    this.rowCopy = JSON.parse(JSON.stringify(this.form));
    this.dialogForm = this.createDialogForm();
    this.saveCallback = null;
    this.dialogBlockUI.stop();
  }

  ngOnInit() {
    this.dialogBlockUI.start('Cargando...');
    combineLatest(
        this._establecimientosService.getTipoEstablecimientos(),
    ).subscribe(      
      ([_tipos]) => {
            this.tipoestablecimientos = _tipos;            
            //this.categories = _categories[0].SportCategories;
            this.dialogBlockUI.stop();
        }, error => {
            this._sweetAlert2Helper.error('Error', 'Ocurrió un error recuperando los formularios. Detalle: ' + error.Message, null, false);
            this.dialogBlockUI.stop();
      });     
  }

  createDialogForm(): FormGroup {
    const formGroup = this._formBuilder.group({
      Nombre: [this.form.Nombre, [Validators.required]],
      Codigo: [this.form.Codigo],
      Domicilio: [this.form.Domicilio],
      TipoEstablecimientoId: [this.form.TipoEstablecimientoId],
    });        
    return formGroup;
  }

  setRawValues(): any {
      const rawValue = this.dialogForm.getRawValue();
      this.form.Codigo = rawValue.Codigo;
      this.form.Nombre = rawValue.Nombre;
      this.form.Domicilio = rawValue.Domicilio;
      this.form.TipoEstablecimientoId = rawValue.TipoEstablecimientoId;
  }

  cancel() {
      this._matDialogRef.close();      
  }

  save() {
    this.dialogBlockUI.start('Guardando...');
    this.setRawValues();
    if (this.action === 'add'){
        this._establecimientosService.addForm(this.form).subscribe((result: any) => {
          console.log('entra addForm',result);
            this.dialogBlockUI.stop();

            //if (result && result.Result){
            if (result){
                console.log('entra addEntity');
                this._establecimientosService.addEntity(this.form);

                /*this._sweetAlert2Helper.question('Aviso', '<b>Establecimiento agregado correctamente.</b>', 'Continuar', 'Finalizar', () => {
                    this._matDialogRef.close(result.Result.CodVersion);
                }, () => {
                    this._matDialogRef.close();
                });*/                
                this._sweetAlert2Helper.success('Aviso', 'Establecimiento agregado correctamente', null, true);
                this._matDialogRef.close();
            } else{
                this._sweetAlert2Helper.error('Error', 'Ocurrió un error al insertar el formulario', null, true);
            }
        }, error => {
            this.dialogBlockUI.stop();
            this._sweetAlert2Helper.error('Error', error.Message, null, true);
        });
    } else{
        this._establecimientosService.editForm(this.form).subscribe((result: any) => {
            this.dialogBlockUI.stop();
            this._sweetAlert2Helper.success('Aviso', 'Establecimiento editado correctamente', null, true);
            this._matDialogRef.close();
        }, error => {
            this.dialogBlockUI.stop();
            this._sweetAlert2Helper.error('Error', error.Message, null, true);
        });
    }  
  }
}
