
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


  displayedColumns: string[] = ['round','coursename','Tee','gtotal','Net','g_topar','Hdcp','Slope','Rating','hci','year'];
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
    this.homeCourse = localStorage.getItem('homeCourse');
    this.country = localStorage.getItem('country') || " ";
    const x = localStorage.getItem('countryCode') || " ";
    this.countryCode = x.toLowerCase() || " ";
    this.birthdate = localStorage.getItem('birthdate');
    this.gender = localStorage.getItem('gender');
    this.name = localStorage.getItem('name');
    console.log(this.countryCode);
    this.getScore(this.userid);
  }


 
  scores=[];
  course;
  
  allScore;
  data = [];
  
  userid;
  homeCourse;
  currentHandicap;
  country = " ";
  countryCode = " ";
  birthdate;
  gender;
  name;
  
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
       this.currentHandicap = this.hcArray[this.hcArray.length -1].handicapIndex;
    //  console.table(this.hcArray);
      // this.dataSource.data = s.scores.scores;
      let tmp=[];  
      for(let i=0;i < this.hcArray.length;i++) {
        for(let j=0;j<this.scores.length;j++) {
          if(this.hcArray[i].rn == this.scores[j].rn) {

            this.scores[j].hc = this.hcArray[i].handicap;
            this.scores[j].hci = this.hcArray[i].handicapIndex;
            this.scores[j].round = i+1;
            this.scores[j].counter = false;
            for(let k=0;k<this.lowScores.length;k++){
              if(this.lowScores[k].r == this.scores[j].rn) {
                this.scores[j].counter = true;
              }
           } 
            tmp.push(this.scores[j]) 
          }
        }
      } 


      this.scores = tmp;

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
    console.log("course id passed in " +x +" y value is: " + y);
    this.course = null;
   this.courses.getCourseId(x)
      .subscribe((courses) => {
          // let temp = courses;
         // console.table(courses);
          for(let i = 0;i < courses.tees.length;i++) {
            console.log( "x id value is:  "  +  courses.tees[i]._id + " y value : " + y);
            if(courses.tees[i]._id == y) {
              console.log ("tee id found");
              this.course = courses.tees[i];
            }
           // console.log(" course tee value " + JSON.stringify(this.course));
          }
        });
 
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getColor(x) {
    
    switch(x) {
      case 4:
      case 3:
      case 2 : {
      return {'background-color': '#e9ea9b'}
      }
 
      case 1 : 
        return {'background-color': '#a1eec7'}
      case 0:
        return {'background-color': 'white'}

        case  -1 : 
        return {'background-color': '#ea6e6e'}

        default: {
          return {'background-color': '#7ca9cf'}
          }
    }
   
  }


  

}
