
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { AlertService } from './services/alert.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Login Template';
  isLoggedIn : boolean;
  isAdmin : boolean;

  constructor(private login: LoginService, private alert: AlertService, private router: Router) {
    this.isLoggedIn = login.isLoggedIn();
    this.isAdmin = login.isAdmin();
  }
  
  
  
  signout() {
    this.login.signout();
    this.router.navigate(['/']);
  }
}
