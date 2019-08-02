

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { CustomMaterialModule } from './assets/materialmodules';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './_components/profile/login/login.component';
import { HomeComponent } from './_components/profile/home/home.component';
import { ResetComponent } from './_components/profile/reset/reset.component';
import { ProfileComponent } from './_components/profile/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateProfileComponent } from './_components/profile/create-profile/create-profile.component';
import { NewuserComponent } from './_components/profile/newuser/newuser.component';
import { ChangePasswordComponent } from './_components/profile/change-password/change-password.component';
import { StatusComponent } from './_components/general/status/status.component';
import { AdminComponent } from './_components/profile/admin/admin.component';
import { CoursesComponent } from './_components/admin/courses/courses.component';
import { UsersComponent } from './_components/admin/users/users.component';

import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { AdminusersComponent } from './_components/admin/adminusers/adminusers.component';

//import { AlertService } from './services/alert.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ResetComponent,
    ProfileComponent,
    CreateProfileComponent,
    NewuserComponent,
    ChangePasswordComponent,
    StatusComponent,
    AdminComponent,
    CoursesComponent,
    UsersComponent,
    AdminusersComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
