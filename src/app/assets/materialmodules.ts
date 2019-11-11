import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule,MatDialogModule } from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import{MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';





@NgModule({
  imports: [MatButtonModule, MatCheckboxModule,MatToolbarModule, MatMenuModule,MatFormFieldModule, 
            MatInputModule, MatListModule,MatTableModule,MatDialogModule, MatGridListModule, MatIconModule],
  exports: [MatButtonModule, MatCheckboxModule,MatToolbarModule, MatMenuModule,MatFormFieldModule, 
            MatInputModule, MatListModule,MatTableModule,MatDialogModule, MatGridListModule, MatIconModule],
})
export class CustomMaterialModule { }