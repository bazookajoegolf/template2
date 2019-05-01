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
  statusMessage = null;
  id : string;
  exp : Date;

  constructor(private signup : LoginService, private router:Router) { }

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
       this.statusMessage = error.error;
       console.log(error.error);
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
            this.statusMessage = "Request Sent Successfully";
            // update the user object.
            setTimeout(() => {
                this.router.navigate(['profile']);
            }, 2000);
        },
            (error) => {
                console.log("This is the error handler" + error.error.message);
                { this.statusMessage = error.error.message }
            }
        );

}

cancelUpdate() {
  this.router.navigate(['profile']);
}

}
