import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { merge, Observable, of as observableOf } from 'rxjs';

import { User } from './../../../models/user';
import { Component, ViewChild,AfterViewInit } from '@angular/core';
import { AlertService } from './../../../services/alert.service';
import {Router} from '@angular/router';
import {AdminusersService} from '../../../services/adminusers.service';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material';





export interface UserProperties {

  name: string;
  email: string;
  isadmin: string;
  createDate: Date;
  lastLogin: Date;
}




@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit {

  displayedColumns: string[] = ['name','email','isadmin','createDate', 'lastLogin'];
  //users = [];

  users = new MatTableDataSource<UserProperties>();
  data: UserProperties;



  resultsLength = 0;
  pageLength = 100;
  isLoadingResults = true;
  
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private adminusers : AdminusersService, private router:Router, private alert : AlertService) { }

  ngAfterViewInit() {
    if(!localStorage.getItem('token')) { this.router.navigate(['login']); }

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.users.paginator = this.paginator;

  

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap( () => {
          this.isLoadingResults = true;
         // return this.adminusers.adminGetSortedUsers(this.sort.active, this.sort.direction, this.paginator.pageSize, this.paginator.pageIndex)
         return this.adminusers.adminGetSortedUsers(this.sort.active, this.sort.direction, 1000, 0)
        }),
        map( data => {
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




  //   this.adminusers.adminGetSortedUsers('name', 'asc', 25, 1)
  //   .subscribe((profile)=>{
  //       if (profile) {
          
  //        this.users = profile;
  //        console.log(" I'm here !");
  //       }
  //   // this.alert.success("Success");
      
  //   },(error) => {
  //      this.alert.error(error.error.message);
  //      console.log(error.error.message);

  // });
}

applyFilter(filterValue: string) {
  
   this.users.filter = filterValue.trim().toLocaleLowerCase();
   //console.log(this.paginator);
   //console.log(this.users.paginator.pageSize);
   
}

}
