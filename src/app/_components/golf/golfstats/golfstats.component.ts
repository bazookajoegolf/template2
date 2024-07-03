import { Component } from '@angular/core';

import { ScoreService } from '../../../services/score.service';
import { CoursesService } from '../../../services/courses.service';

import { AlertService } from './../../../services/alert.service';
import { Router } from '@angular/router';

import { DonutComponent } from '../../stats/donut/donut.component';

@Component({
  selector: 'app-golfstats',
  templateUrl: './golfstats.component.html',
  styleUrls: ['./golfstats.component.css']
})
export class GolfstatsComponent {

  userid;
  homeCourse;
  country;
  nickname;
  countryCode;
  gender;
  name;

  
  scores;
  allScore;
  hcArray;
  lowScores;
  currentHandicap;
  currentYear;

  rounds:number=0;
  scoreAvg:number=0;
  scoreAvgRds:number=0;

  chart: any = [];



  panelOpenState = true;



  constructor( private score: ScoreService ,private courses: CoursesService, private router: Router, private alert: AlertService) {
    this.userid = localStorage.getItem('userid');
    this.homeCourse = localStorage.getItem('homeCourse');
    this.nickname = localStorage.getItem('nickname');
    this.country = localStorage.getItem('country') || " ";
    const x = localStorage.getItem('countryCode') || " ";
    this.countryCode = x.toLowerCase() || " ";
    this.gender = localStorage.getItem('gender');
    this.name = localStorage.getItem('name');
    console.log(this.countryCode);
    this.getScore(this.userid);
    
    
  }
  ngOnInit(): void {
    let x = new Date();
    this.currentYear = x.getFullYear();
  
    // console.log("AllScore:" + this.allScore.length);
  

    


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
      
      for(let i=0;i < this.scores.length;i++) {
        if(this.scores[i].year == this.currentYear ) {
          if(this.scores[i].gtotal) {
             this.rounds++;
             this.scoreAvg =this.scoreAvg+this.scores[i].g_topar;
             this.scoreAvgRds++;
           //  console.log(this.scoreAvg / this.rounds);
          }
  
        }
      }

      //console.log("Rounds: " + this.rounds + "  Scoring Average: " + this.scoreAvg);
     //console.table( this.scores[14]);
    });
  }

}
