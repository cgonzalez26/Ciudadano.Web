import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { FuseSharedModule } from "@fuse/shared.module";

import { Error400Component } from "app/ui/errors/400/error-400.component";
import { TranslateModule } from "@ngx-translate/core";
import { MatIconModule } from "@angular/material/icon";

const routes = [
    {
        path: "errors/error-400",
        component: Error400Component,
    },
];

@NgModule({
    declarations: [Error400Component],
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule,
        TranslateModule,

        MatIconModule,
    ],
})
export class Error400Module {}
