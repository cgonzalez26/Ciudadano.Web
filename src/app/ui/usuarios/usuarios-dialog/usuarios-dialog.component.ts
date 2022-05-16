import { UsuariosService } from './../../../services/usuarios/usuarios.service';
import { Usuario } from './../../../models/usuarios/usuario.model';
import { Component, Inject, ViewChild, ElementRef, OnInit } from '@angular/core';
/*import { MatDialogRef, MAT_DIALOG_DATA, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatDatepicker } from '@angular/material';*/
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDatepicker, } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS,DateAdapter } from '@angular/material/core';

import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { isEqual, omit } from 'lodash';
import { SweetAlert2Helper } from 'app/helpers/sweet-alert-2.helper';
import { KeyValue } from '@angular/common';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { Observable, combineLatest } from 'rxjs';
import * as moment from 'moment';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { RolesService } from 'app/services/roles/roles.service';

export const MY_DATE_FORMATS = {
  parse: {
      dateInput: 'DD/MM/YYYY',
  },
  display: {
      dateInput: 'DD/MM/YYYY',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
  },
};

export interface DialogData {
  titleTranslationCode: string;
  action: string;
  form: Usuario; //Athlete;
  athlete: Usuario;
}

@Component({
  selector: 'usuarios-dialog',
  templateUrl: './usuarios-dialog.component.html',
  styleUrls: ['./usuarios-dialog.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ]
})
export class UsuariosDialogComponent implements OnInit {
  @BlockUI('form-dialog') dialogBlockUI: NgBlockUI;
    //@ViewChild('picker1',null) picker: MatDatepicker<Date>;
    //@ViewChild('BirthDate',null) birthdate: ElementRef;
    @ViewChild('picker1') picker: MatDatepicker<Date>;
    @ViewChild('BirthDate') birthdate: ElementRef;
    
    dialogForm: FormGroup;
    title: string;
    action: string;
    form: Usuario; 
    rowCopy: Usuario = new Usuario();
    saveCallback: (any) => void;
    roles : any[];
    hidePassword:boolean = true;

    public patronLetras = {
      U: { pattern: new RegExp('[a-zA-ZñÑáéíóúÁÉÍÓÚ/ ]') }
    };

    public namePatterns = {
        'A': { pattern: new RegExp('\[a-zA-Z \]')},
    };
    
  constructor( 
    public _matDialogRef: MatDialogRef<UsuariosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _dialogData: DialogData,
    private _formBuilder: FormBuilder,
    private _sweetAlert2Helper: SweetAlert2Helper,
    private _usuariosService: UsuariosService,        
    private _rolesService: RolesService,
    ) { 
      this.dialogBlockUI.start('Cargando...');
      this.title = _dialogData.titleTranslationCode ? _dialogData.titleTranslationCode : 'COMMON.NOT_AVAILABLE';
      this.action = _dialogData.action ? _dialogData.action : 'add';
      this.form = _dialogData.form ? _dialogData.form : new Usuario();   // Athlete();
      this.rowCopy = JSON.parse(JSON.stringify(this.form));
      //this.dialogForm = this.createDialogForm();
      this.createDialogForm();
      this.saveCallback = null;
      this.dialogBlockUI.stop();
    }

  ngOnInit(): void {
    this.dialogBlockUI.start('Cargando...');
    combineLatest(
        this._rolesService.getAll(),
    ).subscribe(      
      ([_roles]) => {
            console.log('roles ',_roles);
            this.roles = _roles;                        
            this.dialogBlockUI.stop();
        }, error => {
            this._sweetAlert2Helper.error('Error', 'Ocurrió un error recuperando los Roles. Detalle: ' + error.Message, null, false);
            this.dialogBlockUI.stop();
      });     

  }

  createDialogForm(): void{//FormGroup {
    //const formGroup = this._formBuilder.group({
    this.dialogForm = this._formBuilder.group({
      sNroDocumento: [this.form.sNroDocumento],
      UsuarioNombre: [this.form.UsuarioNombre, [Validators.required]],
      Nombres: [this.form.Nombres, [Validators.required]],
      Apellidos: [this.form.Apellidos, [Validators.required]],      
      Telefono: [this.form.Telefono],
      Email: [this.form.Email],
      FechaNacimiento: [this.form.FechaNacimiento],       
      RolId: [this.form.RolId, [Validators.required]],
      Password: [this.form.Password],
      ConfirmPassword: [this.form.Password]
    });        
    if (this.action === 'edit') {
      this.dialogForm.get('Password').setValue('********');
      this.dialogForm.get('ConfirmPassword').setValue('********');
    }
    //return formGroup;
  }

  setRawValues(): any {
    const rawValue = this.dialogForm.getRawValue();
    this.form.sNroDocumento = rawValue.sNroDocumento;
    this.form.UsuarioNombre = rawValue.UsuarioNombre;
    this.form.Nombres = rawValue.Nombres;
    this.form.Apellidos = rawValue.Apellidos;
    this.form.Telefono = rawValue.Telefono;
    this.form.Email = rawValue.Email;
    this.form.FechaNacimiento = rawValue.FechaNacimiento;
    this.form.RolId = rawValue.RolId;
    this.form.Password = rawValue.Password;
  } 

  onBlurPassword(): void {
    !this.hidePassword ? this.hidePassword = !this.hidePassword : this.hidePassword;
    if (this.dialogForm.get('Password').value == this.dialogForm.get('ConfirmPassword').value) {
        this.dialogForm.get('Password').setErrors = null;
        this.dialogForm.get('ConfirmPassword').setErrors = null;
        this.dialogForm.get('Password').updateValueAndValidity();
        this.dialogForm.get('ConfirmPassword').updateValueAndValidity();
    }
  }

  cancel() {
    this._matDialogRef.close();
  }

  save() {
    this.dialogBlockUI.start('Guardando...');
    this.setRawValues();
    if (this.action === 'add') {
      this._usuariosService.addForm(this.form).subscribe((result: any) => {
        console.log('entra addForm',result);

          if (result){
              console.log('entra addEntity');
              this._usuariosService.addEntity(this.form);
              this._sweetAlert2Helper.success('Aviso', 'Usuario agregado correctamente', null, true);
              this._matDialogRef.close();
          } else{
              this._sweetAlert2Helper.error('Error', 'Ocurrió un error al registrar el Usuario', null, true);
          }
      }, error => {
          this.dialogBlockUI.stop();
          this._sweetAlert2Helper.error('Error', error.Message, null, true);
      });
    }else{
      this._usuariosService.editWeb(this.form).subscribe((result: any) => {
          this.dialogBlockUI.stop();
          this._sweetAlert2Helper.success('Aviso', 'Usuario editado correctamente', null, true);
          this._matDialogRef.close();
      }, error => {
          this.dialogBlockUI.stop();
          this._sweetAlert2Helper.error('Error', error.Message, null, true);
      });
    }
  }
}
