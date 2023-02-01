import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
// import { AdminusersDataSource } from './adminusers-datasource.ts-old';

@Component({
  selector: 'app-adminusers',
  templateUrl: './adminusers.component.html',
  styleUrls: ['./adminusers.component.css']
})
export class AdminusersComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  //dataSource: AdminusersDataSource;

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
   // this.dataSource = new AdminusersDataSource(this.paginator, this.sort);
  }
}
