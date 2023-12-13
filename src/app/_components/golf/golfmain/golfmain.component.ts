
import { Component, OnInit, OnChanges, ViewChild, AfterViewInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { merge, of as observableOf} from 'rxjs';

import { ScoreService } from '../../../services/score.service';
import { CoursesService } from '../../../services/courses.service';
//import { LoginService } from 'src/app/services/login.service';
import { AlertService } from './../../../services/alert.service';
import { Router } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort,Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import {Score} from '../../../assets/interfaces/interfaces';


@Component({
  selector: 'app-golfmain',
  templateUrl: './golfmain.component.html',
  styleUrls: ['./golfmain.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class GolfmainComponent implements AfterViewInit {


  displayedColumns: string[] = ['date','coursename','Tee','gtotal','Net','g_topar','Hdcp','Slope','Rating','hci','year'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
 // dataSource:MatTableDataSource<any>;

   //dataSource = ELEMENT_DATA;
 
   //dataSource = new MatTableDataSource();
   dataSource;
   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;
  
  resultsLength;


  constructor(private _liveAnnouncer: LiveAnnouncer, private score: ScoreService ,private courses: CoursesService, private router: Router, private alert: AlertService) {
    this.userid = localStorage.getItem('userid');
   
    this.getScore(this.userid);
  }


 
  scores=[];
  course;
  allScore;
  data = [];
  
  userid;
  
  hcArray=[];
  lowScores =[];
  //public dataSource: any = [];


  ngAfterViewInit(): void {

  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  async getScore(x) {
    
    this.score.getScoreId(x)
      .subscribe((s) => {
       // this.roundsplayed = s.scores.scores.length;
       // this.currenthandicap = s.scores.handicap;
      // console.log("Scores " + JSON.stringify(s.scores.scores));
      this.allScore = s.scores;
       this.scores = s.scores.scores; 
       this.hcArray = s.scores.handicapArray;
       this.lowScores = s.scores.lowScoresArray;
    //  console.table(this.hcArray);
      // this.dataSource.data = s.scores.scores;
      this.scores = s.scores.scores.sort(function(a,b) {
          let DateA = new Date(a.date);
          let DateB = new Date(b.date);
          return DateA.getTime()  - DateB.getTime();
       });
       for(let i=0;i<this.scores.length;i++) {
        if(this.hcArray[i].hasOwnProperty('rn')) {
         // console.log("hc " + this.hcArray[i].rn);
          if(this.scores[i].rn == this.hcArray[i].rn ) {
            this.scores[i].hc = this.hcArray[i].handicap;
            this.scores[i].hci = this.hcArray[i].handicapIndex;
          }
        }  
        this.scores[i].counter = false;
        for(let j=0;j<this.lowScores.length;j++){
          if(this.lowScores[j].r == this.scores[i].rn) {
            this.scores[i].counter = true;
          }
        }
       }

       //this.allScore.scores = this.scores;
       this.dataSource = new MatTableDataSource(this.scores);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
     // console.table(this.dataSource.sort);
               
      });
    
 
  }


  countingRound(y) {
  //  console.log(" value passed to countingRound " + y);
  //  console.log("at console log for r " + this.lowScores[0]?.r);
    let x = "";
    let flag = false;
    for(let i=0;i < this.lowScores.length; i++)
    {
      if(y == this.lowScores[i]?.r ){
       // console.log(" value of y: " + y + " value of lowscores " + this.lowScores[i]?.r + "  " + this.lowScores[i].h );
        flag = true;
      }
    }
    
    if(flag) {
      x = "cPeach";
    }
    else {
      x = "cBlank";
    }
   
   // console.log("value of flag " + flag);
    flag = false;
    return x;

  }

  async getCoursebyId(x, y) {
    console.log("course id passed in " +x);
   this.courses.getCourseId(x)
      .subscribe((courses) => {
          // let temp = courses;
          console.table(y);
          for(let i = 0;i < courses.tees.length;i++) {
            if(courses.tees[i]._id == y) {
              console.log ("tee id found");
              this.course = courses.tees[i];
            }
          }
        });
 
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  

}
