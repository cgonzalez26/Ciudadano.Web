import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { FuseConfigService } from "@fuse/services/config.service";
import { fuseAnimations } from "@fuse/animations";

import { locale as english } from "./i18n/en";
import { locale as spanish } from "./i18n/es";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { AuthenticationService } from "../../../services/authentication/authentication.service";
import { Router } from "@angular/router";
import { NgxPermissionsService } from "ngx-permissions";
import { TranslateService } from "@ngx-translate/core";
import { UsuariosService } from "app/services/usuarios/usuarios.service";
import { SweetAlert2Helper } from "app/helpers/sweet-alert-2.helper";
import { Usuario } from "app/models/usuarios/usuario.model";

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class RegisterComponent implements OnInit {
  isLoading: boolean;
 //hasError: boolean;
  registerForm: FormGroup;
  form: Usuario; 
  
  constructor( private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private _authenticationService: AuthenticationService,
    private _router: Router,
    private _ngxPermissionsService: NgxPermissionsService,
    private _translate: TranslateService,
    private _usuariosService: UsuariosService,
    private _sweetAlert2Helper: SweetAlert2Helper,
    ) { 
        // Configure the layout
        this._fuseConfigService.config = {
          layout: {
              navbar: {
                  hidden: true,
              },
              toolbar: {
                  hidden: true,
              },
              footer: {
                  hidden: true,
              },
              sidepanel: {
                  hidden: true,
              },
          },
      };
      this._fuseTranslationLoaderService.loadTranslations(english, spanish);
      this.isLoading = false;
      //this.hasError = false;
      this.form = new Usuario();
    }

  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      // email: ['', [Validators.required, Validators.email]],
      //UsuarioNombre: ["", [Validators.required]],
      //Password: ["", Validators.required],
      sNroDocumento: ['', [Validators.required]],
      UsuarioNombre: ['', [Validators.required]],
      Nombres: ['', [Validators.required]],
      Apellidos: ['', [Validators.required]],      
      Email: ['', [Validators.required]],
      Password: ['', [Validators.required]],      
    });
  }

  setRawValues(): any {    
    const rawValue = this.registerForm.getRawValue();
    this.form.sNroDocumento = rawValue.sNroDocumento;
    this.form.UsuarioNombre = rawValue.UsuarioNombre;
    this.form.Nombres = rawValue.Nombres;
    this.form.Apellidos = rawValue.Apellidos;
    this.form.Telefono = rawValue.Telefono;
    this.form.Email = rawValue.Email;
    this.form.FechaNacimiento = rawValue.FechaNacimiento;
    this.form.RolId = "COD_CONTRIBUYENTE";
    this.form.Password = rawValue.Password;
    console.log('objeto form ',this.form);
  } 

  public register() {
    //return null;
    //this.dialogBlockUI.start('Guardando...');
    this.setRawValues();

    this._usuariosService.addForm(this.form).subscribe((result: any) => {
      console.log('entra addForm',result);

        if (result){
            console.log('entra addEntity');
            this._usuariosService.addEntity(this.form);
            this._sweetAlert2Helper.success('Aviso', 'La Cuenta se registró correctamente', null, true);
            this._router.navigate(['/ui/auth/login']);
        } else{
            this._sweetAlert2Helper.error('Error', 'Ocurrió un error al registrar la Cuenta', null, true);
        }
    }, error => {
        //this.dialogBlockUI.stop();
        this._sweetAlert2Helper.error('Error', error.Message, null, true);
    });
  }
}
