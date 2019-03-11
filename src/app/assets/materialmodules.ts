import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import{MatMenuModule} from '@angular/material/menu';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule,MatToolbarModule, MatMenuModule],
  exports: [MatButtonModule, MatCheckboxModule,MatToolbarModule, MatMenuModule],
})
export class CustomMaterialModule { }