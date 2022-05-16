// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { BaseComponent } from './base.component';
import { BaseTableComponent } from './base-table/base-table.component';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
//import { MatButtonModule, MatMenuModule, MatIconModule, MatFormFieldModule, MatInputModule, MatTooltipModule, MatToolbarModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';

import { DatePipe } from '@angular/common';
import { BaseDialogComponent } from './base-dialog/base-dialog.component';
import { BlockUIModule } from 'ng-block-ui';

@NgModule({
    imports: [
        TranslateModule,
        FuseSharedModule,

        NgxDatatableModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatTooltipModule,
        MatToolbarModule,
        BlockUIModule.forRoot(),
    ],
    declarations: [
        BaseComponent,
        BaseTableComponent,
        BaseDialogComponent,
    ],
    exports: [
        BaseComponent,
        BaseTableComponent,
        BaseDialogComponent,
    ],
    entryComponents: [
        BaseDialogComponent,
    ],
    providers: [
        DatePipe,
    ]
})
export class BaseModule {

}
