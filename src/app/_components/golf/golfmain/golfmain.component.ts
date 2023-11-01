import { Component, OnInit, OnChanges } from '@angular/core';

import { ScoreService } from '../../../services/score.service';
//import { LoginService } from 'src/app/services/login.service';
import { AlertService } from './../../../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-golfmain',
  templateUrl: './golfmain.component.html',
  styleUrls: ['./golfmain.component.css']
})
export class GolfmainComponent implements OnInit, OnChanges {

  constructor(private score: ScoreService, private router: Router, private alert: AlertService) {

  }

  userid;
  scores=[];
  hcArray=[];
  lowScores =[];
  

  ngOnInit() {
    this.userid = localStorage.getItem('userid');
    this.getScore(this.userid);
    
  }

  ngOnChanges() {
    

  }

  getScore(x) {
   
    this.score.getScoreId(x)
      .subscribe((s) => {
       // this.roundsplayed = s.scores.scores.length;
       // this.currenthandicap = s.scores.handicap;
      // console.log("Scores " + JSON.stringify(s.scores.scores));
       this.scores = s.scores.scores; 
       this.hcArray = s.scores.handicapArray;
       this.lowScores = s.scores.lowScoresArray;
     
               
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

  
  

}
