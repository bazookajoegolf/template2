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
  passwordChange = false;
  id : string;
  exp : Date;

  
  constructor(private signup : LoginService, private router:Router) { }

  ngOnInit() :void {  

    if(!localStorage.getItem('token')) { this.router.navigate(['login']); }
        
    this.form = new FormGroup({
      email : new FormControl('',[Validators.required, Validators.email]),
      name : new FormControl ('',[Validators.required, Validators.minLength(5),Validators.maxLength(15)]),
      password : new FormControl ('',[Validators.required, Validators.minLength(5),Validators.maxLength(15)])
       });
        
      // this.form = new FormGroup({
      //   email : new FormControl('',[Validators.required, Validators.email]),
      //   name : new FormControl ('',[Validators.required, Validators.minLength(5),Validators.maxLength(15)]),
      //   oldpassword : new FormControl ('',[Validators.required, Validators.minLength(5),Validators.maxLength(15)]),
      //   password : new FormControl ('',[Validators.required, Validators.minLength(5),Validators.maxLength(15)]),
      //   confirmpassword : new FormControl('',[Validators.required])
      //   },{validators: MatchPassword.match});
  

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
      this.form.patchValue({'password' : "*****"});
      this.form.disable();
      this.id = profile._id;
      } 
      
    },(error) => {
       this.statusMessage = error.error;
       console.log(error.error);
       setTimeout(()=>{
        this.router.navigate(['login']);
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
      oldpassword : this.form.value.oldpassword,
      isadmin : "false"
    }
    this.signup.updateProfile(this.id,post)
    .subscribe(response =>{
        this.statusMessage= "Request Sent Successfully";
        // update the user object.
        setTimeout(()=>{
           // set somewhere later this.router.navigate(['login']);
        },3000);
      },
      (error) => {
        console.log("This is the error handler" + error.error.message);
         { this.statusMessage = error.error.message}
      }
      );

 }

 cancelUpdate() {
  // this.form = null;
  // this.form = new FormGroup({
  //   email : new FormControl('',[Validators.required, Validators.email]),
  //   name : new FormControl ('',[Validators.required, Validators.minLength(5),Validators.maxLength(15)]),
  //    });
  this.form.patchValue({'email' : this.user.email});
  this.form.patchValue({'name' : this.user.name});
  this.form.patchValue({'password' : "*****"});
  this.editMode = false;
  this.passwordChange = false;
  if(this.editMode) {this.form.enable()}
  else (this.form.disable())
  this.statusMessage = null;
}

 onUpdate() {
   this.editMode = true;
   this.passwordChange = false;
   this.form.patchValue({'password' : ""});
   if(this.editMode) {this.form.enable()}
   else (this.form.disable())
   this.statusMessage = null;
 }
 onPasswordUpdate() {
 // this.editMode = !this.editMode;
      this.form = null;
       this.form = new FormGroup({
        oldpassword : new FormControl ('',[Validators.required, Validators.minLength(5),Validators.maxLength(15)]),
        password : new FormControl ('',[Validators.required, Validators.minLength(5),Validators.maxLength(15)]),
        confirmpassword : new FormControl('',[Validators.required])
        },{validators: MatchPassword.match});

  this.passwordChange = true;
  this.editMode = false;
  if(this.passwordChange) {this.form.enable()}
  else (this.form.disable())
  this.statusMessage = null;
}

}
