import { AlertService } from './../../../services/alert.service';
import { User } from '../../../models/user';
import { LoginService } from '../../../services/login.service';

import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormControl,FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  form ;
  user :User;
 // statusMessage = null;
  editMode = false;
  id : string;
  exp : Date;


  
  constructor(private signup : LoginService, private router:Router, private alert : AlertService) { }

  ngOnInit() :void {  

    if(!localStorage.getItem('token')) { this.router.navigate(['login']); }
        
    this.form = new FormGroup({
      email : new FormControl('',[Validators.required, Validators.email]),
      name : new FormControl ('',[Validators.required, Validators.minLength(5),Validators.maxLength(15)]),
      oldpassword: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
    });
        

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
     // this.alert.success("Success");
      
    },(error) => {
       this.alert.error(error.error.message);

       setTimeout(()=>{
         this.alert.clear();
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
            name: this.form.value.name,
            email: this.form.value.email,
            oldpassword: this.form.value.oldpassword
        }


        this.signup.updateProfile(this.id, post)
            .pipe(
                tap(_ => console.log("tapping")) ,
                catchError( err => { throw err.error.message})
                         
            )
            .subscribe (
                response => {
                this.alert.success("Request Sent Successfully");
                 localStorage.setItem('token', response.token);
                // update the user object.
                setTimeout(() => {
                    this.router.navigate(['profile']);
                    this.form.patchValue({'email' : response.user.email});
                    this.form.patchValue({'name' : response.user.name});
                    this.editMode = false;
                    this.form.disable();
                    this.alert.clear();
                }, 2000);
            } ,
               err => this.alert.error(err) 
            );

    }

//     this.signup.updateProfile(this.id, post)
//     .subscribe(response => {
//         this.statusMessage = "Request Sent Successfully";
//         localStorage.setItem('token', response.token);
//         // update the user object.
//         setTimeout(() => {
//             this.router.navigate(['profile']);
//             this.form.patchValue({'email' : this.user.email});
//             this.form.patchValue({'name' : this.user.name});
//             this.editMode = false;
//             this.form.disable();
//             this.statusMessage = null;
//         }, 2000);
//     },
//         (error) => {
//             console.log("This is the error handler" + error.error.message);
//             { this.statusMessage = error.error.message }
//         }
//     );

// }


 cancelUpdate() {
  // this.form = null;
  // this.form = new FormGroup({
  //   email : new FormControl('',[Validators.required, Validators.email]),
  //   name : new FormControl ('',[Validators.required, Validators.minLength(5),Validators.maxLength(15)]),
  //    });
  this.form.patchValue({'email' : this.user.email});
  this.form.patchValue({'name' : this.user.name});
  this.form.patchValue({'oldpassword' : "*****"});
  this.editMode = false;
  if(this.editMode) {this.form.enable()}
  else (this.form.disable())
  this.alert.clear();
}

 onUpdate() {
   this.editMode = true;
    this.form.patchValue({'oldpassword' : ""});
   if(this.editMode) {this.form.enable()}
   else {this.form.disable()}
   this.alert.clear();
 }
 onPasswordUpdate() {
    this.router.navigate(['changepassword']);

//  // this.editMode = !this.editMode;
//   this.passwordChange = true;
//   this.editMode = false;
//   if(this.passwordChange) {this.form.enable()}
//   else (this.form.disable())
//   this.statusMessage = null;
}

}
