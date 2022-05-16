// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { NgxPermissionsGuard } from 'ngx-permissions';
//import { BaseModule } from 'app/base/base.module';

import { CommonModule } from '@angular/common';
//import { ImpuestosTsgService } from 'app/services/deudores-zonas/deudores-zonas.service';
import { DeudoresZonasComponent } from './deudores-zonas.component';
import { DeudoresZonasDialogComponent } from './deudores-zonas-dialog/deudores-zonas-dialog.component';
import { DeudoresZonasTableComponent } from './deudores-zonas-table/deudores-zonas-table.component';

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
import { TitularesService } from 'app/services/titulares/titulares.service';
import { ZonaService } from 'app/services/zonas/zonas.service';

const routes = [
  {
      path: 'report/deudores-zonas',
      component: DeudoresZonasComponent,
      //canActivate: [NgxPermissionsGuard],
      data: {
          permissions: {
              only: 'PAGES_REPORT',
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
  ],
  declarations: [
    DeudoresZonasComponent, 
    DeudoresZonasDialogComponent, 
    DeudoresZonasTableComponent
  ],
  exports: [
    DeudoresZonasComponent, 
    DeudoresZonasDialogComponent, 
    DeudoresZonasTableComponent
  ],
  entryComponents: [
    DeudoresZonasDialogComponent,
  ],
  providers: [
    TitularesService,
    ZonaService        
  ]
})
export class DeudoresZonasModule { }
