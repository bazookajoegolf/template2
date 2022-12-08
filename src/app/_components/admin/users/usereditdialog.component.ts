import { AdminusersService } from './../../../services/adminusers.service';

import { Component, Inject, Optional, OnInit } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators, AsyncValidator } from '@angular/forms';

import { UniqueEmailValidator } from './../../../shared/unique-email-validator.directive';


import { AlertService } from './../../../services/alert.service';

export interface UserProperties {

  name: string;
  email: string;
  isadmin: string;
  createDate: Date;
  lastLogin: Date;
}

@Component({
  selector: 'user-edit-dialog',
  templateUrl: 'usereditdialog.html',
  styleUrls: ['./usereditdialog.css']
})
export class UserEditDialog implements OnInit {
  form: UntypedFormGroup;
  action: string;
  local_data: any;

  constructor(
 
    private fb: UntypedFormBuilder,
    private adminusersService: AdminusersService,
    public dialogRef: MatDialogRef<UserEditDialog>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UserProperties

  ) {
    this.local_data = data;
    this.action = this.local_data.editUser.action;


  }

  ngOnInit(): void {
     this.form = this.fb.group({
      email: [ this.local_data.editUser.email, 
             [Validators.required, Validators.email],
              UniqueEmailValidator(this.adminusersService)                      
      ],
      name: [ this.local_data.editUser.name,
             [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      password: [this.local_data.editUser.password, 
            [Validators.required, Validators.minLength(5), Validators.maxLength(15)]]
    });

    
  }

  doActionClick(action) {
    this.dialogRef.close({ event: action, data: this.local_data });
  }
  get f() {
    return this.form.controls
  };

  onSubmit() {
    console.log("submitted");
  }

  checkUnique(event) {
    console.log (event);

  }
}
