import { UsuariosService } from './../../services/usuarios/usuarios.service';
import { Usuario } from './../../models/usuarios/usuario.model';
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
import { UsuariosDialogComponent } from './usuarios-dialog/usuarios-dialog.component';
import { BaseTableOptions } from 'app/base/base-table/base-table-options';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  @BlockUI('forms-block') dialogBlockUI: NgBlockUI;
  forms: Usuario[];
  forms$: Observable<Usuario[]>;
  userCode: string;
  dialogRef: any;
  baseTableOptions: BaseTableOptions;

  constructor( 
    private _usuariosService: UsuariosService,
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
      this.forms$ = this._usuariosService.getEntities();
      this.forms$.subscribe(forms => {
          this.forms = forms;
      });
    }

  ngOnInit(): void {
    this.dialogBlockUI.start('Cargando...');
    if (!this.forms || this.forms.length == 0) {
        combineLatest(
            this._usuariosService.getAll()
        ).subscribe(
            ([_forms]) => {
                this.forms$ = this._usuariosService.getEntities();
                console.log('usuarios ',this.forms$);
                this.dialogBlockUI.stop();
            }, error => {
                this._sweetAlert2Helper.error('Error', 'Ocurrió un error recuperando los Usuarios. Detalle: ' + error.Message, null, false);
                this.dialogBlockUI.stop();
            });
    } else {
        this.dialogBlockUI.stop();
    }
  }

  add(): void {
    this.dialogRef = this._matDialog.open(UsuariosDialogComponent, {
        panelClass: 'form-dialog',
        width: '50%',
        height: '85%',
        disableClose: true,
        data: {
            titleTranslationCode: 'Agregar Usuario',
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

  edit(row: Usuario): void {
    this._usuariosService.getById(row.Id).subscribe((usersForm: Usuario) =>{
      row = usersForm;  
      this.dialogRef = this._matDialog.open(UsuariosDialogComponent, {
          panelClass: 'form-dialog',
          width: '50%',
          height: '85%',
          disableClose: true,
          data: {
              titleTranslationCode: 'Editar Usuario',
              action: 'edit',
              form: row
          }
      });
    })  
  }

  delete(): void {
    console.log("llego el mensaje");
    this.ngOnInit();
  }
  
  onActivate(row: Usuario) {
    this._usuariosService.setForm(row);
  }

}
