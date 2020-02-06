


import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import { LoginService } from '../../../services/login.service';
import { AlertService } from './../../../services/alert.service';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:FormGroup ;
  //statusMessage = null;
  constructor(private signup : LoginService, private router:Router, private alert : AlertService) { }

  ngOnInit() :void {  
  this.form = new FormGroup({
    email : new FormControl('',[Validators.required,Validators.email]),
    password : new FormControl('',[])
  });
}

get f() {
  return this.form.controls
  };

  onSubmit() {

    const post = {
      email : this.form.value.email,
      password : this.form.value.password
    }
     this.signup.signin(post)
    .subscribe(response =>{

      if(response.token && response) {
        this.alert.success( "Successfully Logged in!");
       
       localStorage.setItem('token', response.token);
      }  
        setTimeout(()=>{
            this.router.navigate(['/']);
        },3000);
      },
      (error) => {
          this.alert.error(error.error.message);
      
      }
      );

 }


}
