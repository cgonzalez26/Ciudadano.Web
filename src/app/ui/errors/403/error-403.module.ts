import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { FuseSharedModule } from "@fuse/shared.module";

import { Error403Component } from "app/ui/errors/403/error-403.component";
import { TranslateModule } from "@ngx-translate/core";
import { MatIconModule } from "@angular/material/icon";

const routes = [
    {
        path: "errors/error-403",
        component: Error403Component,
    },
];

@NgModule({
    declarations: [Error403Component],
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule,
        TranslateModule,

        MatIconModule,
    ],
})
export class Error403Module {}
