// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { NgxPermissionsGuard } from 'ngx-permissions';
//import { BaseModule } from 'app/base/base.module';

import { CommonModule } from '@angular/common';
import { ImpuestosAutService } from 'app/services/impuestos_aut/impuestos_aut.service';
import { VehiculosService } from 'app/services/vehiculos/vehiculos.service';
import { ImpuestosAutComponent } from './impuestos_aut.component';
import { ImpuestosAutDialogComponent } from './impuestos_aut-dialog/impuestos_aut-dialog.component';
import { ImpuestosAutTableComponent } from './impuestos_aut-table/impuestos_aut-table.component';

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
import { ImpuestosAutBoletaComponent } from './impuestos_aut-table/impuestos-aut-boleta/impuestos-aut-boleta.component';
const routes = [
  {
      path: 'management/impuestos_aut',
      component: ImpuestosAutComponent,
      //canActivate: [NgxPermissionsGuard],
      data: {
          permissions: {
              only: 'PAGES_MANAGEMENT_IMPUESTOS_AUT',
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
      ImpuestosAutComponent, 
      ImpuestosAutDialogComponent, 
      ImpuestosAutTableComponent, 
      ImpuestosAutBoletaComponent
  ],
  exports: [
      ImpuestosAutComponent,        
      ImpuestosAutTableComponent,
      ImpuestosAutDialogComponent,
  ],
  entryComponents: [
    ImpuestosAutDialogComponent,
  ],
  providers: [
    ImpuestosAutService,
    VehiculosService        
  ]
})
export class ImpuestosAutModule { }
