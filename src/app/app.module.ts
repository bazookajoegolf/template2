
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
    StatusComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
