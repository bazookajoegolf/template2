


import { Component, OnInit } from '@angular/core';
import {UntypedFormControl,UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import { LoginService } from '../../../services/login.service';
import { AlertService } from './../../../services/alert.service';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../../../assets/css/bkgd.css']
})
export class LoginComponent implements OnInit {
  form:UntypedFormGroup ;
  //statusMessage = null;
  options = {autoClose: true, keepAfterrouteChange: false};
  constructor(private signup : LoginService, private router:Router, private alert : AlertService) { }

  ngOnInit() :void {  
  this.form = new UntypedFormGroup({
    email : new UntypedFormControl('',[Validators.required,Validators.email]),
    password : new UntypedFormControl('',[])
  });

  this.signup.getSettings()
  .subscribe(response =>{
    if(response) {
      localStorage.setItem('minpassword', response.minpassword);
      localStorage.setItem('maxpassword', response.maxpassword);
      localStorage.setItem('minname', response.minname);
      localStorage.setItem('maxname', response.maxname);
    }
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
    //console.log("trying to sign in " + post.email + "  " + post.password);
     this.signup.signin(post)
    .subscribe(response =>{
     // console.log("token received from authentication " + response);
      if(response.token && response) {
       //console.log("Response value " +JSON.stringify(response));
        this.alert.success( "Successfully Logged in!");
       
       localStorage.setItem('token', response.token);
       localStorage.setItem('gender',response.gender);
      }  
        setTimeout(()=>{
            this.router.navigate(['/']);
        },2500);
      },
      (error) => {
          console.log("getting an error trying to log in " + error.error.message);
          console.log(this.alert);
          this.alert.error(error.error.message);
      
      }
      );

 }


}
