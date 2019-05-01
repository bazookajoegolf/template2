import { ChangePasswordComponent } from './_components/profile/change-password/change-password.component';
import { NewuserComponent } from './_components/profile/newuser/newuser.component';
import { CreateProfileComponent } from './_components/profile/create-profile/create-profile.component';
import { LoginComponent } from './_components/profile/login/login.component';
import { ProfileComponent } from './_components/profile/profile/profile.component';
import { ResetComponent } from './_components/profile/reset/reset.component';
import { HomeComponent } from './_components/profile/home/home.component';


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [  { path: '', component: HomeComponent },
{ path: 'profile', component: ProfileComponent },
{ path: 'changepassword', component: ChangePasswordComponent },
{ path: 'reset', component: ResetComponent },
{path:'login', component:LoginComponent},
{path:'newuser', component:CreateProfileComponent},
{path:'validateuser/:id', component:NewuserComponent},
{path:'validateuser', component:NewuserComponent},
{ path: '', redirectTo: '/', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
