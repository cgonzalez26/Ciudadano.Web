import { NgModule } from "@angular/core";
import { LoginModule } from "./authentication/login/login.module";
import { RegisterModule } from "./authentication/register/register.module";
import { Error400Module } from "./errors/400/error-400.module";
import { Error401Module } from "./errors/401/error-401.module";
import { Error403Module } from "./errors/403/error-403.module";
import { Error404Module } from "./errors/404/error-404.module";
import { Error500Module } from "./errors/500/error-500.module";
import { HomeModule } from "./home/home.module";
import { UsuariosModule } from "./usuarios/usuarios.module";
import { EstablecimientosModule } from "./establecimientos/establecimientos.module";
import { ImpuestosAutModule } from "./impuestos_aut/impuestos_aut.module";
import { ImpuestosInmModule } from "./impuestos_inm/impuestos_inm.module";
import { ImpuestosTsgModule } from "./impuestos_tsg/impuestos_tsg.module";
//import { UsuariosComponent } from './usuarios/usuarios.component';
//import { UsuariosTableComponent } from './usuarios/usuarios-table/usuarios-table.component';
//import { UsuariosDialogComponent } from './usuarios/usuarios-dialog/usuarios-dialog.component';
//import { BaseModule } from "../base/base.module";
import { BlockUIModule } from "ng-block-ui";
import { DeudoresZonasModule } from "./reportes/deudores-zonas/deudores-zonas.module";
//import { RegisterComponent } from './authentication/register/register.component';

@NgModule({
    imports: [
        // Authentication
        LoginModule,
        RegisterModule,
        
        // Errors
        Error400Module,
        Error401Module,
        Error403Module,
        Error404Module,
        Error500Module,

        HomeModule,
        UsuariosModule,    
        EstablecimientosModule,
        ImpuestosAutModule,
        ImpuestosInmModule,
        ImpuestosTsgModule,
        DeudoresZonasModule,
        BlockUIModule,
        //BaseModule,
    ],
    //declarations: [RegisterComponent],
    //declarations: [UsuariosComponent, UsuariosTableComponent, UsuariosDialogComponent],
})
export class UiModule {}
