import { UsuariosService } from 'app/services/usuarios/usuarios.service';
import { RolesService } from 'app/services/roles/roles.service';
import { UsuariosTableComponent } from './usuarios-table/usuarios-table.component';

// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { UsuariosComponent } from './usuarios.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { NgxPermissionsGuard } from 'ngx-permissions';
//import { BaseModule } from 'app/base/base.module';
/*import { MatIconModule, MatFormFieldModule, MatInputModule, MatToolbarModule, MatButtonModule, MatDialogModule, MatTooltipModule, 
    MatSelectModule, MatDatepickerModule, MatAutocompleteModule, MatCheckboxModule, MatTabsModule, MatMenuModule, MatDividerModule,
    MatSliderModule, MatCardModule, MatRadioModule  } from '@angular/material';*/
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
import { UsuariosDialogComponent } from './usuarios-dialog/usuarios-dialog.component';
//import { MaterialModule } from './../../material.module';
import { CommonModule } from '@angular/common';
import { BlockUIModule } from 'ng-block-ui';

const routes = [
    {
        path: 'management/usuarios',
        component: UsuariosComponent,
        //canActivate: [NgxPermissionsGuard],
        data: {
            permissions: {
                only: 'PAGES_MANAGEMENT',
                redirectTo: '/pages/errors/error-403'
            }
        }
    },
    {
        path: 'management/usuarios-table',
        component: UsuariosTableComponent,
        //canActivate: [NgxPermissionsGuard],
        data: {
            permissions: {
                only: 'PAGES_MANAGEMENT',
                redirectTo: '/pages/errors/error-403'
            }
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        TranslateModule,
        FuseSharedModule,
        //BaseModule,

        //  MatSelectModule,
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
        //MaterialModule,
        NgxDatatableModule,
        FormsModule,
        ReactiveFormsModule,
        BlockUIModule,
    ],
    declarations: [
        UsuariosComponent,
        UsuariosTableComponent,
        UsuariosDialogComponent,        
    ],
    exports: [
        UsuariosComponent,        
        UsuariosTableComponent,
        UsuariosDialogComponent,
    ],
    entryComponents: [
        UsuariosDialogComponent,
    ],
    providers: [
        UsuariosService,
        RolesService
    ]
})
export class UsuariosModule {

}
