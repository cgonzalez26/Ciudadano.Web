import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { RouterModule } from "@angular/router";

import { FuseSharedModule } from "@fuse/shared.module";

import { LoginComponent } from "app/ui/authentication/login/login.component";
import { RegisterComponent } from 'app/ui/authentication/register/register.component';
import { UsuariosService } from 'app/services/usuarios/usuarios.service';


const routes = [
  {
      path: 'auth/register',
      component: RegisterComponent,
      //canActivate: [NgxPermissionsGuard],
     /* data: {
          permissions: {
              only: 'PAGES_MANAGEMENT',
              redirectTo: '/pages/errors/error-403'
          }
      }*/
  }, 
];


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,

    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
 /* providers: [
    UsuariosService,  
  ]*/
})
export class RegisterModule { }
