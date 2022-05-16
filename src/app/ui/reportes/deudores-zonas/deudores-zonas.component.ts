import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FuseConfigService } from '@fuse/services/config.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { BaseTableOptions } from 'app/base/base-table/base-table-options';
import { SweetAlert2Helper } from 'app/helpers/sweet-alert-2.helper';
import { Deudores } from 'app/models/titulares/deudores';
import { Titular } from 'app/models/titulares/titular';
import { AuthenticationService } from 'app/services/authentication/authentication.service';
import { DeudoresService } from 'app/services/titulares/deudores.services';
import { TitularesService } from 'app/services/titulares/titulares.service';
import { environment } from 'environments/environment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { combineLatest, Observable } from 'rxjs';
import { DeudoresZonasDialogComponent } from './deudores-zonas-dialog/deudores-zonas-dialog.component';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';

@Component({
  selector: 'app-deudores-zonas',
  templateUrl: './deudores-zonas.component.html',
  styleUrls: ['./deudores-zonas.component.scss']
})
export class DeudoresZonasComponent implements OnInit {
  @BlockUI('forms-block') dialogBlockUI: NgBlockUI;
  forms: Deudores[];
  forms$: Observable<Deudores[]>;
  userCode: string;
  dialogRef: any;
  baseTableOptions: BaseTableOptions;
  ZonaId: string = "ID_ALL";

  constructor( 
    private _deudoresService: DeudoresService,
    private _titularesService: TitularesService,
    private _sweetAlert2Helper: SweetAlert2Helper,
    private _matDialog: MatDialog,
    private _fuseConfigService: FuseConfigService,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private router: Router,
    private _authenticationService: AuthenticationService) { 
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
      this.forms$ = this._deudoresService.getEntities();
      this.forms$.subscribe(forms => {
          this.forms = forms;
      });
    }

  ngOnInit(): void {
    this.dialogBlockUI.start('Cargando...');
    const currentUser = this._authenticationService.usuario;   

    if (!this.forms || this.forms.length == 0) {
        combineLatest(
            this._deudoresService.deudoresByZona(this.ZonaId)
        ).subscribe(
            ([_forms]) => {
                this.forms$ = this._deudoresService.getEntities();
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

  view(row: Titular): void {
    this._titularesService.getByNroDocumento(row.sNroDocumento).subscribe((Form: Titular) =>{
      row = Form;  
      this.dialogRef = this._matDialog.open(DeudoresZonasDialogComponent, {
          panelClass: 'form-dialog',
          width: '50%',
          height: '80%',
          disableClose: true,
          data: {
              titleTranslationCode: 'Detalle de Impuestos Adeudados',
              action: 'view',
              form: row
          }
      });
    })
  }
}


