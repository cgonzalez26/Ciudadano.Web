import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from "@angular/router";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { TranslateModule } from "@ngx-translate/core";

import { FuseModule } from "@fuse/fuse.module";
import { FuseSharedModule } from "@fuse/shared.module";
import {
    FuseProgressBarModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,
} from "@fuse/components";

import { fuseConfig } from "app/fuse-config";

import { AppComponent } from "app/app.component";
import { LayoutModule } from "app/layout/layout.module";
import { BlockUIModule } from "ng-block-ui";
import { NgxPermissionsModule } from "ngx-permissions";
import { IConfig, NgxMaskModule } from "ngx-mask";
import { MatDialogModule } from "@angular/material/dialog";
import { JwtInterceptor } from "./interceptors/jwt.interceptor";
import { ErrorInterceptor } from "./interceptors/error.interceptor";
import { AuthenticationService } from "./services/authentication/authentication.service";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";

//import { MaterialModule } from './material.module';
//import { BaseModule } from "./base/base.module";



export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

const appRoutes: Routes = [
    // {
    //     path: "ui",
    //     loadChildren: "./main/ui/ui.module#UiModule",
    // },
    {
        path: "ui",
        loadChildren: () => import("./ui/ui.module").then((m) => m.UiModule),
    },
    {
        path: "**",
        redirectTo: "ui/home",
    },
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes, {
            relativeLinkResolution: "legacy",
            useHash: true,
        }),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        //BaseModule,

        // A partir de aquí, lo que se agregó
        // no vienen incluidos en el template.
        NgxPermissionsModule.forRoot(),
        MatDialogModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatSelectModule,
        NgxMaskModule.forRoot(options),
        //MaterialModule,

        BlockUIModule.forRoot(),
    ],
    bootstrap: [AppComponent],
    // A partir de aquí, lo que se agregó
    // no vienen incluidos en el template.
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        AuthenticationService,
    ],
})
export class AppModule {}
