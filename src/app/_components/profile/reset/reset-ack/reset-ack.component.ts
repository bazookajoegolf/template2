
import { AlertService } from './../../../../services/alert.service';
import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import { LoginService } from '../../../../services/login.service';

@Component({
  selector: 'app-reset-ack',
  templateUrl: './reset-ack.component.html',
  styleUrls: ['./reset-ack.component.css']
})
export class ResetAckComponent implements OnInit {

  form:FormGroup ;
  confirmationNumber: string;

  //statusMessage = null;
  constructor(private signup : LoginService, private router:Router, private alert: AlertService) { }

  ngOnInit() :void {  
 
  this.form = new FormGroup({
    email : new FormControl('',[Validators.required, Validators.email]),
    newpassword : new FormControl('',[Validators.required, Validators.minLength(5)]),
    confirmid : new FormControl('',[Validators.required])
  });

  this.confirmationNumber = this.router.url.slice(11,50).trim();
  
}

get f() {
  return this.form.controls
  };

  onSubmit() {
    const id:String = this.form.value.confirmid;

    const post = {
      confirmid : this.form.value.confirmid,
      email : this.form.value.email,
      newpassword : this.form.value.newpassword
    }
     this.signup.resetConfirm(id,post)
    .subscribe(response =>{
        console.log(response);
        this.alert.success("Request Sent Successfully");
        setTimeout(()=>{
            this.router.navigate(['login']);
        },3000);
      },
      (error) => {
           { this.alert.error( error.error.message);}
      
      }
      );

 }
}
