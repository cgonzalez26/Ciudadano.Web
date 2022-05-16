import { ImpuestosAutService } from '../../services/impuestos_aut/impuestos_aut.service';
import { Establecimiento } from '../../models/establecimientos/establecimiento';
import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { SweetAlert2Helper } from 'app/helpers/sweet-alert-2.helper';
import { environment } from 'environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';
import { FuseConfigService } from '@fuse/services/config.service';
import { Router } from '@angular/router';
import { ImpuestosAutDialogComponent } from './impuestos_aut-dialog/impuestos_aut-dialog.component';
import { BaseTableOptions } from 'app/base/base-table/base-table-options';
import { ImpuestosAut } from 'app/models/impuestos_aut/impuestos_aut';
import { AuthenticationService } from "../../services/authentication/authentication.service";
import { VehiculosService } from "../../services/vehiculos/vehiculos.service";
import { Console } from 'console';
import { Vehiculo } from 'app/models/vehiculos/vehiculo';
import { ImpuestoAutPrint } from 'app/models/impuestos_aut/impuestos_aut_print';

@Component({
  selector: 'impuestos_aut',
  templateUrl: './impuestos_aut.component.html',
  styleUrls: ['./impuestos_aut.component.scss']
})
export class ImpuestosAutComponent implements OnInit {
  @BlockUI('forms-block') dialogBlockUI: NgBlockUI;
  forms: ImpuestosAut[];
  forms$: Observable<ImpuestosAut[]>;
  userCode: string;
  dialogRef: any;
  baseTableOptions: BaseTableOptions;
  sNroDocumento: string = "";
  row_print: ImpuestoAutPrint;

  constructor(
    private _impuestos_autService: ImpuestosAutService,
    private _sweetAlert2Helper: SweetAlert2Helper,
    private _matDialog: MatDialog,
    private _fuseConfigService: FuseConfigService,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private router: Router,
    private _authenticationService: AuthenticationService, 
    private _vehiculosService: VehiculosService,  
  ) { 
    this._fuseConfigService.config = {
      layout: {
          navbar: {
              hidden: false
          },
          toolbar: {
              hidden: false
          },
          footer: {
              hidden: true
          },
          sidepanel: {
              hidden: true
          }
      }
    };
    this._fuseTranslationLoaderService.loadTranslations(english, spanish);
    
    this.userCode = JSON.parse(localStorage.getItem(environment.localStorageAuthDataItem)).UserCode;
    this.forms$ = this._impuestos_autService.getEntities();
    this.forms$.subscribe(forms => {
        this.forms = forms;
    });
  }

  ngOnInit(): void {
    this.dialogBlockUI.start('Cargando...');
    const currentUser = this._authenticationService.usuario;
    this.sNroDocumento = (currentUser.Rol.Id == 'COD_CONTRIBUYENTE')? currentUser.sNroDocumento: 'admin';

    if (!this.forms || this.forms.length == 0) {
        combineLatest(
            this._impuestos_autService.getByNroDocumento(this.sNroDocumento),
            //this._impuestos_autService.getByTitular(sNroDocumento);
        ).subscribe(
            ([_forms]) => {
                this.forms$ = this._impuestos_autService.getEntities();
                //console.log('datos imp aut',this.forms$); SI lo tiene                
                this.dialogBlockUI.stop();
            }, error => {
                this._sweetAlert2Helper.error('Error', 'Ocurrió un error recuperando los Impuestos. Detalle: ' + error.Message, null, false);
                this.dialogBlockUI.stop();
            });
    } else {
        this.dialogBlockUI.stop();
    }
  }

  onActivate(row: ImpuestosAut) {
    this._impuestos_autService.setForm(row);
    /* document.getElementById('tFormSelected').innerHTML = row.Formulario;
    this.router.navigate(['pages', 'form-configuration', row.CodFormulario, row.CodVersion]);
    localStorage.setItem(environment.localStorageEditItem, JSON.stringify(row)); */
  }

  edit(row: ImpuestosAut): void {
    this._impuestos_autService.getById(row.Id).subscribe((impForm: ImpuestosAut) =>{
      row = impForm;
      this.dialogRef = this._matDialog.open(ImpuestosAutDialogComponent, {
          panelClass: 'form-dialog',
          width: '50%',
          height: '85%',
          disableClose: true,          
          data: {
              titleTranslationCode: 'Impresión Boleta de Impuesto Automotor',
              action: 'edit',
              form: row,
          }
      });
    })
  }
}
