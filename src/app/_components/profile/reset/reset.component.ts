import { Component, OnInit } from '@angular/core';

import {FormControl,FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import { LoginService } from '../../../services/login.service';
import { AlertService } from './../../../services/alert.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  form:FormGroup ;
  constructor(private signup : LoginService, private router:Router, private alert : AlertService) { }

  ngOnInit() :void {  
    this.form = new FormGroup({
      email : new FormControl('',[Validators.required,Validators.email])
    });
  }

get f() {
  return this.form.controls
  };

onSubmit() {

  const post = {
    email : this.form.value.email,
  }
   this.signup.reset(post)
  .subscribe(response => { 
      this.alert.success( "Password Reset Sent Successfully.  You will be receiving an Email shortly!");
      setTimeout(()=>{
          this.router.navigate(['/reset-ack']);
      },4000);
    },
    (error) => {
        this.alert.error(error.error.message);
    
    }
    );

}
}