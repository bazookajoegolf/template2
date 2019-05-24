import { AlertService } from './../../../services/alert.service';
import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {

  form:FormGroup ;
  //statusMessage = null;
  constructor(private signup : LoginService, private router:Router, private alert: AlertService) { }

  ngOnInit() :void {  
  this.form = new FormGroup({
    confirmid : new FormControl('',[Validators.required])
  });
}

get f() {
  return this.form.controls
  };

  onSubmit() {

    const post = {
      confirmid : this.form.value.confirmid
    }
     this.signup.confirm(post)
    .subscribe(response =>{
        this.alert.success("Request Sent Successfully");
        setTimeout(()=>{
            this.router.navigate(['login']);
        },3000);
      },
      (error) => {
          console.log(error);
           { this.alert.error( error.error);}
      
      }
      );

 }

}
