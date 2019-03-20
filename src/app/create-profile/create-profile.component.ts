import { MatchPassword } from './../validators/password-validator';
import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup, Validators} from '@angular/forms';




@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit {
  form 
  constructor() { }

  ngOnInit() :void {  
  this.form = new FormGroup({
  email : new FormControl('',[Validators.required, Validators.email]),
  name : new FormControl ('',[Validators.required, Validators.minLength(5),Validators.maxLength(15)]),
  password : new FormControl ('',[Validators.required, Validators.minLength(5),Validators.maxLength(15)]),
  confirmpassword : new FormControl('',[Validators.required])
  },{validators: MatchPassword.match});
}
  get f() {
      return this.form.controls
      };

  onSubmit() {
    console.log(this.form.value);
  }

}
