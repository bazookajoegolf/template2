import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { LoginService } from './services/login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Login Template';

  constructor(private login: LoginService, private router: Router) {}
  signout() {
    this.login.signout();
    this.router.navigate(['/']);
  }
}
