import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";

import { FuseSharedModule } from "@fuse/shared.module";

import { HomeComponent } from "./home.component";
import { BlockUIModule } from "ng-block-ui";
import { MatButtonModule } from '@angular/material/button';

const routes = [
    {
        path: "home",
        component: HomeComponent,
    },
];

@NgModule({
    declarations: [HomeComponent],
    imports: [
        RouterModule.forChild(routes), 
        TranslateModule, 
        FuseSharedModule,
        BlockUIModule.forRoot(),
        MatButtonModule,
    ],
    exports: [HomeComponent],
})
export class HomeModule {}
