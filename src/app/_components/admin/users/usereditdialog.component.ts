import { Component, Inject, Optional } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AlertService } from './../../../services/alert.service';
import {Router} from '@angular/router';
import {AdminusersService} from '../../../services/adminusers.service';

export interface UserProperties {

    name: string;
    email: string;
    isadmin: string;
    createDate: Date;
    lastLogin: Date;
  }
  


@Component({
    selector : 'user-edit-dialog',
    templateUrl : 'usereditdialog.html',
    styleUrls: ['./usereditdialog.css']
  })
  export class UserEditDialog {

    action: string;
    local_data:any;

    constructor(
      public dialogRef: MatDialogRef<UserEditDialog>, 
      @Optional() @Inject(MAT_DIALOG_DATA) public data: UserProperties
    ) {
        this.local_data = data;
        this.action = this.local_data.editUser.action;
        
    }
  
    doActionClick(action) {
      this.dialogRef.close({event:action, data:this.local_data});
    }

    

  }
  