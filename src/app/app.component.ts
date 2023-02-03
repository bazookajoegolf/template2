
import { Router } from '@angular/router';
import { Component,OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { AlertService } from './services/alert.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Login Template';
  isLoggedIn : boolean;
  isAdmin : boolean;
  userName : string = "";

  //this is a change

  constructor(public login: LoginService, private alert: AlertService, private router: Router) {

  }
  ngOnInit() :void {  
    this.isLoggedIn = this.login.isLoggedIn();
    this.isAdmin = this.login.isAdmin();
    //this.userName = this.login.CurrentUser;
    console.log("are you logged in: " + this.isLoggedIn);
    
    }
        
  
  
  signout() {
    this.login.signout();
    this.router.navigate(['/']);
  }
}
