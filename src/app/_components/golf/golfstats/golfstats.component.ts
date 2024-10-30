import { Sort } from '@angular/material/sort';
import { Component } from '@angular/core';

import { ScoreService } from '../../../services/score.service';
import { CoursesService } from '../../../services/courses.service';

import { AlertService } from './../../../services/alert.service';
import { Router } from '@angular/router';



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
  allCourses;
  allScore;
  hcArray;
  lowScores;
  currentHandicap;
  currentYear;

  rounds:[];
  scoreAvg:number=0;
  scoreAvgRds:number=0;
  scoresbyYear = [];
  roundsbyYear = [];
  scoreTypes = [];
  scoreType=[];  
  fairways=[];
  blah = 1;

  chartData: any ;
  id = ["chart1","chart2","chart3"];
  labels = [];
  colors = ["#775100","#3c434a","#135e96","#005c12","#82424","#dba617","#4262ab"];
  types = ["Aces","Albatross+","Eagles","Birdies","Par","Bogeys","Double Bogeys+"];
  fwtypes = ["Water", "Sand", "Left Trouble", "Left Rough","Fairway","Right Rough","Right Trouble"];
  scorePerHole = ["s1","s2","s3","s4","s5","s6","s7","s8","s9","s10","s11","s12","s13","s14","s15","s16","s17","s18"];
  parPerHole = ["p1","p2","p3","p4","p5","p6","p7","p8","p9","p10","p11","p12","p13","p14","p15","p16","p17","p18"];


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
  //  console.log(this.countryCode);
    this.getScore(this.userid);
    
    
  }
  ngOnInit(): void {
    let x = new Date();
    this.currentYear = x.getFullYear();
   // console.log(typeof(this.currentYear));

    for(let i=this.currentYear; i>this.currentYear-5;i--) {
      this.labels.push(i);
    }
     
   // console.log("scoresbyYear" + JSON.stringify(this.scoresbyYear));
  
  }

  ngOnChanges() {
    
  }

  async getScore(x) {
    this.courses.getCourses()
       .subscribe((c) =>{
        this.allCourses = c;

    this.score.getScoreId(x)
      .subscribe((s) => {
       // this.roundsplayed = s.scores.scores.length;
       // this.currenthandicap = s.scores.handicap;
      // console.log("Scores " + JSON.stringify(s.scores.scores));
      let x = [];
      let y = [];
      let z = [];
      let zz = [];
      let fw = [];
      let fwfw = [];
      
       this.allScore = s.scores;
       this.scores = s.scores.scores; 
       this.hcArray = s.scores.handicapArray;
       this.lowScores = s.scores.lowScoresArray;
       this.currentHandicap = this.hcArray[this.hcArray.length -1].handicapIndex;
       
      // console.log(this.labels.length);
       x.push(['Year', 'Rounds',{'role' : 'style'},{'role' : 'annotation'}]);
       y.push(['Year', 'Scores',{'role' : 'style'},{'role' : 'annotation'}]);
       z.push(['Type', 'Amount',{'role' : 'style'}]);
       fw.push(['Type', 'Amount',{'role' : 'style'}]);
       for(let i=0; i < this.labels.length;i++) {
         x.push([(this.labels[i]).toString() , 0 ,this.colors[i], 0]);
         y.push([(this.labels[i]).toString() , 0 ,this.colors[i], 0]);

      }
      for(let i=0; i < this.types.length;i++) {
        z.push([(this.types[i]).toString() , 0 ,this.colors[i]]);

     }
     for(let i=0; i < this.fwtypes.length;i++) {
      fw.push([(this.fwtypes[i]).toString() , 0 ,this.colors[i]]);

   }
      //console.log(JSON.stringify(fw));
      //console.log(this.scores.length);
       for (const item of this.scores) {
      //  console.log(item.holesplayed);
          let c_id = item.courseid;
          let t_id = item.teeid;
          let tee;
         // console.log(t_id);
         for(const c of this.allCourses) {
          if(c._id == c_id) {
            for(const t of c.tees) {
              if(t._id == t_id) {
                tee = t;
              }
            }
          }
         }
          

          for(let i=0;i<x.length;i++){
          //  console.log(item.year  + item.holesplayed  );
             if((item.year).toString()  == x[i][0]&& item.holesplayed =="18") {
                x[i][1]++;
                x[i][3]++;
                
                y[i][1]+=item.g_topar;
                
               // this.scoresbyYear[i][2]+= item.gtotal;
             }
         //    if((item.scoredetail).toString()!="1") {

         }
         let courseId = item.courseid;
          for(let j=0;j<18;j++) {
            let s = "s"+(j+1);
            let p = "p"+(j+1);
            let f = "f"+(j+1);
            if(item[s] && item[s]!=99) {
            if(item[s]==1) {
              z[1][1]++;
            }
            if(j==0) {
              console.log("Score: " + parseInt(item[s]) + "  Par: " + parseInt(tee[p]));
            }
            switch(parseInt(item[s])-parseInt(tee[p])){
              case -5:
              case -4:
              case -3:
                z[2][1]++;
                break;
              case -2:
                z[3][1]++;
                break;
              case -1:
                z[4][1]++;
                break;
              case 0:
                z[5][1]++;
                break;
              case 1:
                z[6][1]++;
                break;

              default:
                 z[7][1]++;
              
            }
            switch(item[f]) {
              case 'W':
                fw[1][1]++;
                break;
              case 'S':
                fw[2][1]++;
                break;
              case 'L2':
                fw[3][1]++;
                break;
              case 'L1':
                fw[4][1]++;
                break;
              case 'Y':
                fw[5][1]++;
                break;
              case 'R1':
                fw[6][1]++;
                break;
              case 'R2':
                fw[7][1]++;
                break;

            }
          }
         }
       }
    //   console.log(JSON.stringify(fw));
       zz.push(['Type', 'Amount',{'role' : 'style'}]);
    // below adds quantity to legend of pie chart
       for(let i=0; i < this.types.length;i++) {
        //zz.push([(this.types[i]).toString() , 0 ,this.colors[i]]);
        zz.push([(this.types[i]).toString() + ": (" + z[i+1][1] +")" , z[i+1][1],this.colors[i]]);

     }
     fwfw.push(['Type', 'Amount',{'role' : 'style'}]);
     for(let i=0; i < this.fwtypes.length;i++) {
      //zz.push([(this.types[i]).toString() , 0 ,this.colors[i]]);
      fwfw.push([(this.fwtypes[i]).toString() + ": (" + fw[i+1][1] +")" , fw[i+1][1],this.colors[i]]);

   }

       for (let i=1;i <x.length;i++) {
        let tmp = Math.round(((y[i][1] / x[i][1]) + 72)*100) /100;
        y[i][1] = tmp;
        y[i][3] = y[i][1];
       }

    console.log(JSON.stringify(y));
    this.roundsbyYear = x;   
    this.scoresbyYear = y;  
    this.scoreTypes = zz;
    this.fairways = fwfw;


    });
  });

  }

}
