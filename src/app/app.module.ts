

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';

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
import { UsersComponent} from './_components/admin/users/users.component';
import {UserEditDialog} from './_components/admin/users/usereditdialog.component';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { AdminusersComponent } from './_components/admin/adminusers/adminusers.component';
import { SnackstatusComponent } from './_components/general/snackstatus/snackstatus.component';
import { UniqueEmailValidatorDirective } from './shared/unique-email-validator.directive';
import { BoolToTextPipe } from './shared/bool-to-text.pipe';
import { ResetAckComponent } from './_components/profile/reset/reset-ack/reset-ack.component';
import { SettingsComponent } from './_components/admin/settings/settings.component';

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
    UserEditDialog,
    UsersComponent,
    AdminusersComponent,
    SnackstatusComponent,
    UniqueEmailValidatorDirective,
    BoolToTextPipe,
    ResetAckComponent,
    SettingsComponent
    
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
    MatSortModule,
    FlexLayoutModule
  ],
  entryComponents:[
    UserEditDialog
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
