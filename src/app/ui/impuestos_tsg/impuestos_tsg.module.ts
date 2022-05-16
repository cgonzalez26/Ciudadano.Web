// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { NgxPermissionsGuard } from 'ngx-permissions';
//import { BaseModule } from 'app/base/base.module';

import { CommonModule } from '@angular/common';
import { ImpuestosTsgService } from 'app/services/impuestos_tsg/impuestos_tsg.service';
import { ImpuestosTsgComponent } from './impuestos_tsg.component';
import { ImpuestosTsgDialogComponent } from './impuestos_tsg-dialog/impuestos_tsg-dialog.component';
import { ImpuestosTsgTableComponent } from './impuestos_tsg-table/impuestos_tsg-table.component';

import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BlockUIModule } from 'ng-block-ui';
const routes = [
  {
      path: 'management/impuestos_tsg',
      component: ImpuestosTsgComponent,
      //canActivate: [NgxPermissionsGuard],
      data: {
          permissions: {
              only: 'PAGES_MANAGEMENT_impuestos_tsg',
              redirectTo: '/pages/errors/error-403'
          }
      }
  },
];

@NgModule({  
  imports: [
    RouterModule.forChild(routes),
    TranslateModule,
    FuseSharedModule,
    //BaseModule,

    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDividerModule,
    MatSliderModule,
    MatTabsModule,
    MatCardModule,
    MatRadioModule,
    CommonModule,

    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    BlockUIModule,
    //EstablecimientosDialogModule,
  ],
  declarations: [
      ImpuestosTsgComponent, 
      ImpuestosTsgDialogComponent, 
      ImpuestosTsgTableComponent
  ],
  exports: [
      ImpuestosTsgComponent,        
      ImpuestosTsgTableComponent,
      ImpuestosTsgDialogComponent,
  ],
  entryComponents: [
    ImpuestosTsgDialogComponent,
  ],
  providers: [
    ImpuestosTsgService        
  ]
})
export class ImpuestosTsgModule { }
