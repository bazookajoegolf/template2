import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ResetComponent } from './reset/reset.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [  { path: '', component: HomeComponent },
{ path: 'profile', component: ProfileComponent },
{ path: 'reset', component: ResetComponent },
{path:'login', component:LoginComponent},
{ path: '', redirectTo: '/', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
