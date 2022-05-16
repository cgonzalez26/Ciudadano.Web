import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { FuseSharedModule } from "@fuse/shared.module";

import { Error404Component } from "app/ui/errors/404/error-404.component";
import { TranslateModule } from "@ngx-translate/core";
import { MatIconModule } from "@angular/material/icon";

const routes = [
    {
        path: "errors/error-404",
        component: Error404Component,
    },
];

@NgModule({
    declarations: [Error404Component],
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule,
        TranslateModule,

        MatIconModule,
    ],
})
export class Error404Module {}
