import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import{MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';






@NgModule({
  imports: [MatButtonModule, MatCheckboxModule,MatToolbarModule, MatMenuModule,MatFormFieldModule,MatCardModule, 
            MatInputModule, MatListModule,MatTableModule,MatDialogModule, MatGridListModule, MatIconModule,
            MatSnackBarModule,MatSidenavModule,MatRadioModule,MatExpansionModule,MatTabsModule,MatTooltipModule,
            MatSelectModule,MatChipsModule  ],
  exports: [MatButtonModule, MatCheckboxModule,MatToolbarModule, MatMenuModule,MatFormFieldModule, MatCardModule,
            MatInputModule, MatListModule,MatTableModule,MatDialogModule, MatGridListModule, MatIconModule,
            MatSnackBarModule,MatSidenavModule,MatRadioModule,MatExpansionModule,MatTabsModule,MatTooltipModule,
            MatSelectModule,MatChipsModule  ],
})
export class CustomMaterialModule { }