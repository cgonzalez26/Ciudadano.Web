import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { FuseSharedModule } from "@fuse/shared.module";

import { Error500Component } from "app/ui/errors/500/error-500.component";
import { TranslateModule } from "@ngx-translate/core";

const routes = [
    {
        path: "errors/error-500",
        component: Error500Component,
    },
];

@NgModule({
    declarations: [Error500Component],
    imports: [RouterModule.forChild(routes), TranslateModule, FuseSharedModule],
})
export class Error500Module {}
