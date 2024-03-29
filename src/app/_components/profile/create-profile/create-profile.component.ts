import { AlertService } from './../../../services/alert.service';
import { LoginService } from '../../../services/login.service';
import { MatchPassword } from '../../../validators/password-validator';
import { Component, OnInit } from '@angular/core';
import {UntypedFormControl,UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';




@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css','../../../assets/css/bkgd.css']
})
export class CreateProfileComponent implements OnInit {
  form: UntypedFormGroup ;
  //statusMessage = null;
  constructor(private signup : LoginService, private router:Router, private alert : AlertService) { }

  ngOnInit() :void {  
  this.form = new UntypedFormGroup({
  email : new UntypedFormControl('',[Validators.required, Validators.email]),
  name : new UntypedFormControl ('',[Validators.required, Validators.minLength(3),Validators.maxLength(40)]),
  gender : new UntypedFormControl ('',[Validators.required]),
  password : new UntypedFormControl ('',[Validators.required, Validators.minLength(5),Validators.maxLength(15)]),
  confirmpassword : new UntypedFormControl('',[Validators.required])
  },{validators: MatchPassword.match});
}
  get f() {
      return this.form.controls
      };

  onSubmit() {
    const post = {
      name : this.form.value.name,
      email : this.form.value.email,
      password : this.form.value.password,
      isadmin : "false",
      status : "Disabled",
      gender : this.form.value.gender,
      roles : ['User'],
      notes : " "

    }
    console.log(post);
    this.signup.signup(post)
    .subscribe(response =>{
        this.alert.success("Request Sent Successfully");
        setTimeout(()=>{
            this.router.navigate(['validateuser']);
        },3000);
      },
      (error) => {
        if(error.status === 409) { 
          this.alert.error(error.error.message);
        }
      }
      );
     
 }

}
