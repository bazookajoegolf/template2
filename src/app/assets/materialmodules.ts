import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import{MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule,MatToolbarModule, MatMenuModule,MatFormFieldModule, MatInputModule, MatListModule],
  exports: [MatButtonModule, MatCheckboxModule,MatToolbarModule, MatMenuModule,MatFormFieldModule, MatInputModule, MatListModule],
})
export class CustomMaterialModule { }