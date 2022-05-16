import { EstablecimientosService } from './../../services/establecimientos/establecimientos.service';
import { Establecimiento } from './../../models/establecimientos/establecimiento';
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
import { EstablecimientosDialogComponent } from './establecimientos-dialog/establecimientos-dialog.component';
import { BaseTableOptions } from 'app/base/base-table/base-table-options';


@Component({
  selector: 'establecimientos',
  templateUrl: './establecimientos.component.html',
  styleUrls: ['./establecimientos.component.scss']
})
export class EstablecimientosComponent implements OnInit {

  @BlockUI('forms-block') dialogBlockUI: NgBlockUI;
  forms: Establecimiento[];
  forms$: Observable<Establecimiento[]>;
  userCode: string;
  dialogRef: any;
  baseTableOptions: BaseTableOptions;

  constructor( 
    private _establecimientosService: EstablecimientosService,
    private _sweetAlert2Helper: SweetAlert2Helper,
    private _matDialog: MatDialog,
    private _fuseConfigService: FuseConfigService,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private router: Router
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
      this.forms$ = this._establecimientosService.getEntities();
      this.forms$.subscribe(forms => {
          this.forms = forms;
      });
    }

  ngOnInit(): void {
    this.dialogBlockUI.start('Cargando...');
    if (!this.forms || this.forms.length == 0) {
        combineLatest(
            this._establecimientosService.getAll()
        ).subscribe(
            ([_forms]) => {
                this.forms$ = this._establecimientosService.getEntities();
                this.dialogBlockUI.stop();
            }, error => {
                this._sweetAlert2Helper.error('Error', 'Ocurrió un error recuperando los Establecimientos. Detalle: ' + error.Message, null, false);
                this.dialogBlockUI.stop();
            });
    } else {
        this.dialogBlockUI.stop();
    }
  }

  add(): void {
    this.dialogRef = this._matDialog.open(EstablecimientosDialogComponent, {
        panelClass: 'form-dialog',
        width: '50%',
        height: '50%',
        disableClose: true,
        data: {
            titleTranslationCode: 'Agregar Establecimiento',
            action: 'add',
            form: null
        }
    });

    this.dialogRef.afterClosed().subscribe((codVersion: string) => {
        if (!codVersion) {
            return;
        }        
    });
}

edit(row: Establecimiento): void {
  this._establecimientosService.getById(row.Id).subscribe((estForm: Establecimiento) =>{
    row = estForm;  
    this.dialogRef = this._matDialog.open(EstablecimientosDialogComponent, {
        panelClass: 'form-dialog',
        width: '50%',
        height: '50%',
        disableClose: true,
        data: {
            titleTranslationCode: 'Editar Establecimiento',
            action: 'edit',
            form: row
        }
    });
  })
}

onActivate(row: Establecimiento) {
    this._establecimientosService.setForm(row);
    /* document.getElementById('tFormSelected').innerHTML = row.Formulario;
    this.router.navigate(['pages', 'form-configuration', row.CodFormulario, row.CodVersion]);
    localStorage.setItem(environment.localStorageEditItem, JSON.stringify(row)); */
}

}
