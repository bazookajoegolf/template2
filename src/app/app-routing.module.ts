

import { AdminGuard } from './services/admin.guard';
import { AuthGuard } from './services/auth.guard';

import { AdminComponent } from './_components/profile/admin/admin.component';
import { ChangePasswordComponent } from './_components/profile/change-password/change-password.component';
import { NewuserComponent } from './_components/profile/newuser/newuser.component';
import { CreateProfileComponent } from './_components/profile/create-profile/create-profile.component';
import { LoginComponent } from './_components/profile/login/login.component';
import { ProfileComponent } from './_components/profile/profile/profile.component';
import { ResetComponent } from './_components/profile/reset/reset.component';
import { ResetAckComponent } from './_components/profile/reset/reset-ack/reset-ack.component';
import { HomeComponent } from './_components/profile/home/home.component';

import {CoursesComponent} from './_components/admin/courses/courses.component';
import {AdminusersComponent}  from './_components/admin/adminusers/adminusers.component';
import {UsersComponent}  from './_components/admin/users/users.component';
import { SettingsComponent } from './_components/admin/settings/settings.component';


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [  { path: '', component: HomeComponent },
{ path: 'profile', component: ProfileComponent , canActivate: [AuthGuard]},
{ path: 'changepassword', component: ChangePasswordComponent },
{ path: 'reset', component: ResetComponent },
{path: 'reset-ack/:id',component:ResetAckComponent},
{path: 'reset-ack',component:ResetAckComponent},
{path:'login', component:LoginComponent},
{path:'newuser', component:CreateProfileComponent},
{path: 'admin' , component:AdminComponent , canActivate: [ AdminGuard]},
{path:'validateuser/:id', component:NewuserComponent},
{path:'validateuser', component:NewuserComponent},
{path:'users', component:UsersComponent, canActivate: [AdminGuard]},
{path:'admincourses', component:CoursesComponent, canActivate: [AdminGuard]},
{path:'adminusers', component:AdminusersComponent, canActivate: [AdminGuard]},
{path:'adminsettings', component:SettingsComponent, canActivate: [AdminGuard]},
{ path: '', redirectTo: '/', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
