import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { merge, Observable, of as observableOf } from 'rxjs';

import { User } from './../../../models/user';
import { Component, ViewChild, AfterViewInit, Inject, OnInit } from '@angular/core';
import { AlertService } from './../../../services/alert.service';
import { Router } from '@angular/router';
import { AdminusersService } from '../../../services/adminusers.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators, AsyncValidator } from '@angular/forms';


export interface UserProperties {

  id: string;
  name: string;
  email: string;
  isadmin: string;
  createDate: Date;
  lastLogin: Date;
  status: string;
  roles: [];
  notes: string;
}




@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['name', 'email', 'Status', 'isadmin', 'createDate', 'lastLogin', 'edit'];
  //users = [];

  users = new MatTableDataSource<UserProperties>();
  data: UserProperties;
  editUsers: UserProperties;
  value: string;

  opened = false;

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
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      notes: [''],
      status: ['']

    });

    this.resetPasswordForm = this.fb.group({
      password: ['',
        [Validators.required, Validators.minLength(5)]
      ]
    });


  }

  ngAfterViewInit() {
    if (!localStorage.getItem('token')) { this.router.navigate(['login']); }

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
          // console.log("data count " + data[1] );
          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe(data => this.users.data = data.users);

  }

  applyFilter(filterValue: string) {

    this.users.filter = filterValue.trim().toLocaleLowerCase();
    //console.log(this.paginator);
    //console.log(this.users.paginator.pageSize);

  }

  get f() {
    return this.form.controls
  };

  get p() {
    return this.resetPasswordForm.controls
  }

  onSubmit() {
    console.log("submitted");
  }

  onPasswordSubmit() {
    console.log("Submitting Password Change");
  }

  onDelete() {
    console.log("I'm deleting " + this.form.get('id').value);
  }

  checkUnique() {

    console.log("Email address: " + this.form.get('email').value);
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


  displayOverlay(action: string, data, $event) {
    this.opened = true;
    this.action = action;
    this.form.reset();
    this.resetPasswordForm.reset();
    if (data) {
      this.originalEmail = data.email;
      this.okEmail = true;
    }
    else {
      this.originalEmail = "";
      this.okEmail = false;
    }
    $event.stopPropagation();
    if (data) {
      this.form.setValue({
        name: data.name, email: data.email, password: "11111", status: data.status, id: data._id,
        notes: data.notes || ""
      });

    }
  }

  addRowData(rowData) { }

  updateRowData(rowData) { }

  deleteRowData(rowData) { }


}

