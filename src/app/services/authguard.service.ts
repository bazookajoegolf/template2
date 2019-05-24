import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Authguard implements CanActivate {

  constructor(private router: Router, private login : LoginService) { }

  canActivate() {
    if(this.login.isLoggedIn()) return true;

    this.router.navigate(['/login']);
    return false;
  }
}
