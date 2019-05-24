import { AlertService } from './../../../services/alert.service';
import { User } from '../../../models/user';
import { LoginService } from '../../../services/login.service';
import { MatchPassword } from '../../../validators/password-validator';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormControl,FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  form ;
  user :User;
  //statusMessage = null;
  id : string;
  exp : Date;

  constructor(private signup : LoginService, private router:Router, private alert : AlertService) { }

  ngOnInit() {

    if(!localStorage.getItem('token')) { this.router.navigate(['login']); }
        
      this.form = new FormGroup({
          name : new FormControl ({value : '', disabled : true}),
          oldpassword: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
          password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
          confirmpassword: new FormControl('', [Validators.required])
      }, { validators: MatchPassword.match });


    this.signup.getProfile()
    .subscribe((profile)=>{
      if(profile) {
      this.form.patchValue({'name' : profile.name});
      this.user = profile;
      this.id = profile._id;
      } 
      
    },(error) => {
       this.alert.error(error.error);
       setTimeout(()=>{
        this.router.navigate(['login']);
    },2000);

    });

  }

  ngOnDestroy(): void {  }

  get f() {
    return this.form.controls
    };
  
   
  get p() {
    return this.user
  }

  onSubmit() {
    const post = {
        oldpassword: this.form.value.oldpassword,
        password: this.form.value.password,
        name : this.user.name,
        email : this.user.email
    }
    this.signup.updateProfile(this.id, post)
        .subscribe(response => {
            this.alert.success("Request Sent Successfully");
            // update the user object.
            setTimeout(() => {
                this.router.navigate(['profile']);
            }, 2000);
        },
            (error) => {
                this.alert.error(error.error.message);
            }
        );

}

cancelUpdate() {
  this.alert.clear();
  this.router.navigate(['profile']);
  
}

}
