import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { merge, Observable, of as observableOf, throwError } from 'rxjs';

import { User } from './../../../models/user';
import { Component, ViewChild, AfterViewInit, Inject, OnInit, ElementRef } from '@angular/core';
import { AlertService } from './../../../services/alert.service';
import { Router } from '@angular/router';
import { AdminusersService } from '../../../services/adminusers.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators, AsyncValidator, ValidationErrors } from '@angular/forms';


export interface UserProperties {

  id: string;
  name: string;
  email: string;
  isadmin: boolean;
  createDate: Date;
  lastLogin: Date;
  status: string;
  gender: string;
  roles: [];
  notes: string;
}




@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['name', 'email', 'Status','gender', 'isadmin', 'createDate', 'lastLogin', 'edit'];
  //users = [];

  users = new MatTableDataSource<UserProperties>();
  data: UserProperties;
  editUsers: UserProperties;
  value: string;

  opened = false;

  chkEnabled = false;
  delStatus = true;
  disableCheck:boolean;
  userIndex: number;

  form: FormGroup;
  resetPasswordForm: FormGroup;
  action: string;
  originalEmail: string;
  okEmail: boolean;

  resultsLength = 0;
  pageLength = 100;
  isLoadingResults = true;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;


  constructor(private adminusers: AdminusersService, private router: Router,
    private alert: AlertService, public dialog: MatDialog, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [],
      email: ['',
        [Validators.required, Validators.email]],
      name: ['',
        [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      isadmin: [''],
      notes: [''],
      status: [''],
      gender: ['', [Validators.required]]

    });

    this.resetPasswordForm = this.fb.group({
      password: ['',
        [Validators.required, Validators.minLength(5),Validators.maxLength(100)]
      ]
    });


  }

  ngAfterViewInit() {
    if (!localStorage.getItem('token')) { this.router.navigate(['login']); }
    this.getData();


  }

  getData() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.users.paginator = this.paginator;

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          // return this.adminusers.adminGetSortedUsers(this.sort.active, this.sort.direction, this.paginator.pageSize, this.paginator.pageIndex)
          return this.adminusers.adminGetSortedUsers(this.sort.active, this.sort.direction, 1000, 0)
        }),
        map(data => {
          this.isLoadingResults = false;
          this.resultsLength = data.totalUsers;
          console.log("The min password length is: " + data.minpassword);
          // console.log("data count " + data[1] );
          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe(data => this.users.data = data.users);


  }

  // clearCheck() {
  //   console.log("cleared");
  // }

  formReset() {
    this.chkEnabled = true;
    this.delStatus = true;
  }

  applyFilter(filterValue: string) {

    this.users.filter = filterValue.trim().toLocaleLowerCase();
  }

  get f() {
    return this.form.controls
  };

  get p() {
    return this.resetPasswordForm.controls
  }

  onSubmit() {
    const post = {
      name : this.form.value.name,
      email : this.form.value.email,
      password : this.form.value.password,
      isadmin : this.form.value.isadmin ? true : false,
      status : this.form.value.status ? "Disabled" : "Enabled",
      gender : this.form.value.gender,
      roles : ['User'],
      notes : this.form.value.notes ? this.form.value.notes : " "
    }
    if(this.action==='new') {
      
      this.adminusers.adminCreateNewUser(post)
      .subscribe(response =>{
          this.alert.success("User Created Successfully");
          setTimeout(()=>{
              this.opened=!this.opened;
              this.getData();
              this.action = "";
              this.form.reset();
          },2000);
        },
        (error) => {
          if(error) { this.alert.error(error.error.message);}
        }
        );
     // console.log("New user: " + JSON.stringify( post));
    }

    else {
      const _id = this.form.value.id;

      this.adminusers.adminUpdateUser(_id, post)
      .subscribe(response => {
        this.alert.success(response.message);
        setTimeout(() => {
          this.opened = false;
          // this.users.data.splice(this.userIndex , 1);
          // console.log(this.users.data);
          this.getData();
          this.action = "";
          this.form.reset();
        }, 2000);
      },
        (error) => this.alert.error(error.error.message));
      //console.log("Modified user: "+ _id + "   " + JSON.stringify(post));
    }




  }

  onPasswordSubmit() {
    const _id = this.form.value.id;

    const post = {
      password : this.resetPasswordForm.value.password
    }

    this.adminusers.adminUpdateUserPassword(_id, post)
    .subscribe(response => {
      this.alert.success(response.message);
      setTimeout(() => {
        this.opened = false;
      //  this.getData();
        this.action = "";
        this.form.reset();
      }, 2000);
    },
      (error) => this.alert.error(error.error.message));
    console.log("Submitting Password Change");
  }

  onDelete() {

    this.adminusers.adminDeleteUser(this.form.get('id').value)
      .subscribe(response => {
        this.alert.success(response.message);
        setTimeout(() => {
          this.opened = false;
          // this.users.data.splice(this.userIndex , 1);
          // console.log(this.users.data);
          this.getData();
          this.action = "";
          this.form.reset();
        }, 2000);
      },
        (error) => this.alert.error(error.error.message));
  }

  onCheck() {

    this.delStatus = !this.delStatus;

  }

  checkUnique() {

   // console.log("Email address: " + this.form.get('email').value);
    if (this.form.get('email').value === this.originalEmail && this.action === "edit") {
    } else {
      const isUnique = this.adminusers.adminGetEmailAddress(this.form.get('email').value)
        .pipe(
          map(res => {

            return res.length ? true : false;
          })
        );
      isUnique.subscribe(a => {
        this.okEmail = a;
        if (a) {
          this.form.controls['email'].setErrors({ 'UniqueEmail': a });
        }
        // console.log(this.form);

      });
    }
  }

  displayOverlay(action: string, adata, $event, index) {

    this.form.reset();
    this.resetPasswordForm.reset();
   // console.log(this.form);
    this.formReset();

    this.chkEnabled = false;
    this.delStatus = true;
    this.action = "";

   
    this.opened = true;
    this.action = action;
    
    this.userIndex = index;
    
    this.resetPasswordForm.reset();
    if (adata) {
      this.originalEmail = adata.email;
      this.okEmail = true;
    }
    else {
      this.originalEmail = "";
      this.okEmail = false;
    }
    $event.stopPropagation();
    if (adata) {
      let x:boolean;
      if (adata.status==="Enabled") {x=false} else {x=true}
      this.form.setValue({
        name: adata.name, email: adata.email, password: "11111", status: x, gender : adata.gender, isadmin: adata.isadmin, id: adata._id,
        notes: adata.notes || " "
      });
      this.userIndex = index;
     // if (adata.status == "Enabled") { this.disableCheck = false } else { this.disableCheck = true; }

    }

  }

  addRowData(rowData) { }

  updateRowData(rowData) { }

  deleteRowData(rowData) { }


}

