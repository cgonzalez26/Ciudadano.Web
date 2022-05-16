import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule, DatePipe, DecimalPipe } from "@angular/common";

import { FlexLayoutModule } from "@angular/flex-layout";

import { FuseDirectivesModule } from "@fuse/directives/directives";
import { FusePipesModule } from "@fuse/pipes/pipes.module";
import { TranslateModule } from "@ngx-translate/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { NgxMaskModule } from "ngx-mask";
import { NgxSpinnerModule } from "ngx-spinner";
import { SweetAlert2Helper } from "app/helpers/sweet-alert-2.helper";
import { MatSnackBarHelper } from "app/helpers/mat-snack-bar.helper";
import { TranslationHelper } from "app/helpers/translation.helper";
import { NgxPermissionsModule } from "ngx-permissions";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        FuseDirectivesModule,
        FusePipesModule,

        // A partir de aquí, lo que se agregó
        // no vienen incluidos en el template.
        TranslateModule,
        MatDialogModule, // FIX Esto corrige el siguiente error: No component factory found for BaseDialogComponent. Did you add it to @NgModule.entryComponents?
        MatSnackBarModule,
        NgxMaskModule,
        NgxSpinnerModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        FuseDirectivesModule,
        FusePipesModule,

        // A partir de aquí, lo que se agregó
        // no vienen incluidos en el template.
        NgxPermissionsModule,
        TranslateModule,
        MatDialogModule, // FIX Esto corrige el siguiente error: No component factory found for BaseDialogComponent. Did you add it to @NgModule.entryComponents?
        MatSnackBarModule,
        NgxMaskModule,
        NgxSpinnerModule,
    ],
    // A partir de aquí, lo que se agregó
    // no vienen incluidos en el template.
    providers: [
        TranslationHelper,
        SweetAlert2Helper,
        MatSnackBarHelper,
        DatePipe,
        DecimalPipe,
    ],
})
export class FuseSharedModule {}
