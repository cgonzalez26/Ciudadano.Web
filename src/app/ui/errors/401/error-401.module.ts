import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { FuseSharedModule } from "@fuse/shared.module";

import { Error401Component } from "app/ui/errors/401/error-401.component";
import { TranslateModule } from "@ngx-translate/core";
import { MatIconModule } from "@angular/material/icon";

const routes = [
    {
        path: "errors/error-401",
        component: Error401Component,
    },
];

@NgModule({
    declarations: [Error401Component],
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule,
        TranslateModule,

        MatIconModule,
    ],
})
export class Error401Module {}
