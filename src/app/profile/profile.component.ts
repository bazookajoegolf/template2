import { User } from './../models/user';
import { LoginService } from './../services/login.service';
import { MatchPassword } from './../validators/password-validator';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormControl,FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  form ;
  user :User;
  statusMessage = null;
  editMode = false;

  
  constructor(private signup : LoginService, private router:Router) { }

  ngOnInit() :void {  

    if(!localStorage.getItem('token')) { this.router.navigate(['login']); }
        
    this.form = new FormGroup({
      email : new FormControl('',[Validators.required, Validators.email]),
      name : new FormControl ('',[Validators.required, Validators.minLength(5),Validators.maxLength(15)]),
      password : new FormControl ('',[Validators.required, Validators.minLength(5),Validators.maxLength(15)]),
      confirmpassword : new FormControl('',[Validators.required])
      },{validators: MatchPassword.match});


    this.signup.getProfile()
    .subscribe((profile)=>{
      if(profile) {
      //console.log(profile.name);
      this.user = profile;
      //  this.user = profile.name;
      //  this.user.email = profile.email;
      //  this.user.password = profile.password;
      this.form.patchValue({'email' : profile.email});
      this.form.patchValue({'name' : profile.name});

      } 
      
    },(error) => {
       this.statusMessage = error.message;
       setTimeout(()=>{
        this.router.navigate(['validateuser']);
    },2000);

    });

   // this.form.email.set
}

ngOnDestroy() : void {

}

get f() {
  return this.form.controls
  };
 
get p() {
  return this.user
}  
  
  onSubmit() {
    const post = {
      name : this.form.value.name,
      email : this.form.value.email,
      password : this.form.value.password,
      isadmin : "false"
    }
    this.signup.signup(post)
    .subscribe(response =>{
        this.statusMessage= "Request Sent Successfully";
        setTimeout(()=>{
            this.router.navigate(['validateuser']);
        },3000);
      },
      (error) => {
        console.log("This is the error handler" +error.error);
         { this.statusMessage = error.message}
      }
      );

 }

}
