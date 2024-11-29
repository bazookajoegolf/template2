import { Sort } from '@angular/material/sort';
import { Component } from '@angular/core';

import { UntypedFormControl,UntypedFormGroup, FormControl, FormGroup} from '@angular/forms';

import { ScoreService } from '../../../services/score.service';
import { CoursesService } from '../../../services/courses.service';

import { AlertService } from './../../../services/alert.service';
import { Router } from '@angular/router';

declare var google:any;



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

  form;
  selectedYear="All";
  selectedHoles="18";
  roundsLabel="18 hole Rounds per Year";
  averageLabel="Average 18 hole Score per Year";

  scores;
  allCourses;
  allScore=[];
  count9;
  count18;
  scores9=[];
  scores18=[];
  twoAndthree=[];
  distinct9=[];
  distinct18=[];
  hcArray;
  lowScores;
  currentHandicap;
  currentYear;
 
  googly;

  rounds;
  scoreAvg:number=0;
  scoreAvgRds:number=0;
  scoresbyYear = [];
  roundsbyYear = [];
  scoreTypes = [];
  scoreType=[];  
  fairways=[];
  putts=[];
  scoring=[];
  scoreToPar=[];
  handicap=[];
  lhi=[];
  blah = 1;
  lowscores=[];
  highscores=[];
  parscores=[];
  birdiescores=[];
  highfairways=[];
  lowfairways=[];
  highputts=[];
  lowputts=[];

  width=0;
  smwidth=0;
  chartData: any ;
  id = ["chart1","chart2","chart3"];
  labels = [];
  labels18=[];
  labels9=[];
  colors = ["#775100","#3c434a","#135e96","#005c12","#82424","#dba617","#4262ab"];
  types = ["Aces","Albatross+","Eagles","Birdies","Par","Bogeys","Double Bogeys+"];
  puttTypes = ["Zero","One","Two","Three+"];
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
    this.getScore(this.userid, "All");
    
    
  }

  ngOnInit(): void {
    let x = new Date();
    this.width = window.innerWidth;
    this.smwidth = window.innerWidth * .8;
    this.currentYear = x.getFullYear();

    this.form = new FormGroup({
      year : new FormControl('All', []),
      holes : new FormControl('18', [])
  
    })

    this.googly = google.charts.load('current', {packages: ['corechart','table']});
  
  }

  ngOnChanges() {

    
  }

  onResize(e){
    this.width = e.target.innerWidth;
  }

  selectHoles(e) {
    console.log(e.value);
    if(e.value == "18") {
      this.selectedHoles = "18";
      this.labels = this.labels18;
      this.scores = this.scores18;
      this.form.controls['year'].value="All";
      console.log(this.form.controls['year'].value );
      this.roundsLabel="18 hole Rounds per Year";
      this.averageLabel="Average 18 hole Score per Year";
    }
    else if (e.value== "9") {
      this.selectedHoles = "9";
      this.labels = this.labels9;
      this.scores = this.scores9;
      this.form.controls['year'].value="All";
      this.roundsLabel="9 hole Rounds per Year";
      this.averageLabel="Average 9 hole Score per Year";
    }
    this.getHighLow(this.scores, this.allCourses);
    this.getRounds(this.scores,);
    this.getHighLowIndex(this.hcArray);
    this.getLevelThree(this.scores);
    this.getHighLowTwoThree(this.scores,this.allCourses);

   // need to sort scores by date
    this.scores.sort((a,b) => {
       if( new Date(a.date) < new Date(b.date)) {return -1}
       if( new Date(a.date) > new Date(b.date)) {return 1}
       return 0;
    });

    this.getScoring(this.scores); 
  }

  selectYear(e) {
   // const year = parseInt(e.value);

   // console.log(e.value);
    this.selectedYear=e.value;
   if(e.value=="All") {
     // console.log("Years: " + this.selectedYear + "  holes: " + this.selectedHoles);
      if(this.selectedHoles == "18") {
        this.scores =  this.scores18;
      }
      else {
        this.scores =  this.scores9;
      }
   }
   else {
      if(this.selectedHoles == "18") {
        this.scores = this.scores18.filter((yr) => this.selectedYear == yr.year);
      }
      else {
        this.scores = this.scores9.filter((yr) => this.selectedYear == yr.year);
      }
    }

    this.getHighLow(this.scores, this.allCourses);
    this.getRounds(this.scores,);
    this.getHighLowIndex(this.hcArray);
    this.getLevelThree(this.scores);
    this.getHighLowTwoThree(this.scores,this.allCourses);

   // need to sort scores by date
    this.scores.sort((a,b) => {
       if( new Date(a.date) < new Date(b.date)) {return -1}
       if( new Date(a.date) > new Date(b.date)) {return 1}
       return 0;
    });

    this.getScoring(this.scores); 

  //  this.get
  }

  getHighLowTwoThree(s, co){
    const birdie=[];
    const pars=[];
    const highfwy=[];
    const lowfwy=[];
    const highputts=[];
    const lowputts=[];
   
    // for (const item of s) {
    //    // i++;
    //     var d = new Date(item.date);
    //     var location;
    //     for(const c of co) {
    //       if(c._id == item.courseid) {
    //         location = c.name;
    //       }
    //      }
        
    //     birdie.push([d.toLocaleDateString(),location , item.coursename,item.birdietotal]);

    // }




    s.sort((a,b) => {
      if( a.birdietotal > b.birdietotal) {return -1}
      if( a.birdietotal < b.birdietotal) {return 1}
      return 0;
   });
   birdie.push(['Date','Location','Course' ,'Birdies']);
  // pars.push(['Date','Location','Course' ,'Score','+/-', 'Handicap']);
  let itemcount=0;

  for (const item of s) {
    itemcount++;
    //console.log("Birdies: " + item.birdietotal);
    if(item && itemcount <= 5) {
     // i++;
      var d = new Date(item.date);
      var location;
      for(const c of co) {
        if(c._id == item.courseid) {
          location = c.name;
        }
       }
      
      birdie.push([d.toLocaleDateString(),location , item.coursename,item.birdietotal]);
    }
  }
  this.birdiescores = birdie;

  s.sort((a,b) => {
    if( a.partotal > b.partotal) {return -1}
    if( a.partotal < b.partotal) {return 1}
    return 0;
 });
 pars.push(['Date','Location','Course' ,'Pars']);
// pars.push(['Date','Location','Course' ,'Score','+/-', 'Handicap']);
   itemcount=0;

for (const item of s) {
  itemcount++;
  //console.log("Birdies: " + item.birdietotal);
  if(item && itemcount <= 5) {
   // i++;
    var d = new Date(item.date);
    var location;
    for(const c of co) {
      if(c._id == item.courseid) {
        location = c.name;
      }
     }
    
    pars.push([d.toLocaleDateString(),location , item.coursename,item.partotal]);
  }
}
this.parscores = pars;
  //console.log(JSON.stringify(birdie));




  }
  getHighLow(s, co) {
    const low=[];
    const high=[];

    s.sort((a,b) => {
      if( a.g_topar < b.g_topar) {return -1}
      if( a.g_topar > b.g_topar) {return 1}
      return 0;
   });
   low.push(['Date','Location','Course' ,'Score','+/-', 'Handicap']);
   high.push(['Date','Location','Course' ,'Score','+/-', 'Handicap']);

   let i=0;
   let itemcount=0;
  // console.log(s.length);
   for (const item of s) {
    itemcount++;
    if(item && itemcount <= 5) {
        i++;
        var d = new Date(item.date);
        var location;
        for(const c of co) {
          if(c._id == item.courseid) {
            location = c.name;
          }
         }
        
        low.push([d.toLocaleDateString(),location , item.coursename,item.gtotal,item.g_topar,
                  (Math.trunc(item.handicap *100 )/100)]);

    }
    if(item && itemcount > (this.scores.length-5)) {
      //   console.log("in high score");
         i++;
         var d = new Date(item.date);
         var location;
         for(const c of co) {
           if(c._id == item.courseid) {
             location = c.name;
           }
          }
         
         high.splice(1,0,[d.toLocaleDateString(),location , item.coursename,item.gtotal,item.g_topar,
                   (Math.trunc(item.handicap *100 )/100)]);
 
       }
     }
     this.lowScores = low;
     this.highscores = high;
  

  }

  getRounds(s) {
    let x = [];
    let y = [];
    x.push(['Year', 'Rounds',{'role' : 'style'},{'role' : 'annotation'}]);
    y.push(['Year', 'Scores',{'role' : 'style'},{'role' : 'annotation'}]);
    for(let i=0; i < this.labels.length;i++) {
      x.push([(this.labels[i]).toString() , 0 ,this.colors[i], 0]);
      y.push([(this.labels[i]).toString() , 0 ,this.colors[i], 0]);
    }
      for (const item of s) {
        for(let i=0;i<x.length;i++){
          //  console.log(item.year  + item.holesplayed  );
          if((item.year).toString()  == x[i][0]) {
                x[i][1]++;
                x[i][3]++;
                y[i][1]+=item.g_topar;
          }
        }
      }
   
    for (let i=1;i <=this.labels.length;i++) {
      let tmp;
      if(this.selectedHoles =="18") { tmp = Math.round(((y[i][1] / x[i][1]) + 72)*100) /100;}
      else { tmp = Math.round(((y[i][1] / x[i][1]) + 36)*100) /100;}

    //  console.log(tmp);
      y[i][1] = tmp;
      y[i][3] = y[i][1];
     }
   //  console.log(JSON.stringify(x));
    this.roundsbyYear = x;   
    this.scoresbyYear = y;  
  }

  getScoring(s) {
    let su = [];
    let par = [];

    su.push(['Date', 'Score',{'role' : 'style'}]);  //
    par.push(['Date', 'Score to Par',{'role' : 'style'}]);  //
    for (const item of s) {
      var d = new Date(item.date);
      su.push([d.toLocaleDateString() , item.gtotal,"red"]);
      par.push([d.toLocaleDateString() , item.g_topar,"blue"]);
    }
    this.scoring = su; 
    this.scoreToPar = par; 
  }

  getHighLowIndex(a) {
    let hc = [];
    let lh = [];
    hc.push(['Date', 'Handicap Index',{'role' : 'style'}]);
    lh.push(['Date', 'Low Handicap Index',{'role' : 'style'}]);
    for (const hcitem of a) {
      var d = new Date(hcitem.date);
      hc.push([d.toLocaleDateString() , hcitem.handicapIndex,"green"]);
      if(hcitem.lhiIndex != 54){
        lh.push([d.toLocaleDateString() , hcitem.lhiIndex,"brown"]);
      }

     }
     this.handicap = hc;
     this.lhi = lh;
  }

  getLevelThree(s) {
    let z = [];
    let zz = [];
    let fw = [];
    let fwfw = [];
    let pu = [];
    let pupu =[];
    z.push(['Type', 'Amount',{'role' : 'style'}]);
    fw.push(['Type', 'Amount',{'role' : 'style'}]);
    pu.push(['Type', 'Amount',{'role' : 'style'}]);

    //let level18 = s.filter((yr) => 18 == yr.holesplayed);
    
    for(let i=0; i < this.types.length;i++) {
      z.push([(this.types[i]).toString() , 0 ,this.colors[i]]);

   }
   for(let i=0; i < this.fwtypes.length;i++) {
    fw.push([(this.fwtypes[i]).toString() , 0 ,this.colors[i]]);

   }
   for(let i=0; i < this.puttTypes.length;i++) {
    pu.push([(this.puttTypes[i]).toString() , 0 ,this.colors[i]]);
   }

   for (const item of s) {
    if(item.scoredetail == 3) {
      pu[1][1]+=item.zeroputts;
      pu[2][1]+=item.oneputts;
      pu[3][1]+=item.twoputts;
      pu[4][1]+=item.threeputtsplus;


      fw[1][1]+=item.fw;
      fw[2][1]+=item.fs;
      fw[3][1]+=item.fl2;
      fw[4][1]+=item.fl1;
      fw[5][1]+=item.fy;
      fw[6][1]+=item.fr1;
      fw[7][1]+=item.fr2;
     }
     if(item.scoredetail== 3 || item.scoredetail== 2) {
      z[2][1]+=item.albatotal;
      z[3][1]+=item.eagletotal;
      z[4][1]+=item.birdietotal;
      z[5][1]+=item.partotal;
      z[6][1]+=item.bogeytotal;
      z[7][1]+=item.doubletotal;
     }


      for(let j=0;j<18;j++) {
         let s = "s"+(j+1);
         if(item[s] && item[s]!=99) {
            if(item[s]==1) {
              z[1][1]++;
            }
         }
        }


  }

  pupu.push(['Type', 'Amount',{'role' : 'style'}]);
  for(let i=0; i < this.puttTypes.length;i++) {
   pupu.push([(this.puttTypes[i]).toString() + ": (" + pu[i+1][1] +")" , pu[i+1][1],this.colors[i]]);
  }


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
  this.putts = pupu;
  this.scoreTypes = zz;
  this.fairways = fwfw;

  }

  async getScore(x,yr) {
    this.courses.getCourses()
       .subscribe((c) =>{
        this.allCourses = c;

    this.score.getScoreId(x)
      .subscribe((s) => {
      
       this.allScore = s.scores;
       this.rounds = s.scores.length;
       this.allScore = s.scores.scores; 
       // default to 18 hole rounds
      this.scores18 = this.allScore.filter((yr) => 18 == yr.holesplayed);
      this.scores=this.scores18;
      this.scores9 = this.allScore.filter((yr) => ("f9" == yr.holesplayed || "b9"== yr.holesplayed || "9" ==yr.holesplayed ));
      this.count18 = this.scores18.length;
      this.count9 = this.scores9.length;
      this.distinct18 = [...new Set(this.scores18.map(x => x.year))];
      this.distinct18.sort((a,b) => {
        if( a > b) {return -1}
        if( a < b) {return 1}
        return 0;
     });
      this.distinct9 = [...new Set(this.scores9.map(x => x.year))];
      this.distinct9.sort((a,b) => {
        if( a > b) {return -1}
        if( a < b) {return 1}
        return 0;
     });
     for(let i=0;i<this.distinct18.length;i++) {
      this.labels18.push(parseInt(this.distinct18[i]));
      }
      for(let i=0;i<this.distinct9.length;i++) {
        this.labels9.push(parseInt(this.distinct9[i]));
      }
      this.labels = this.labels18;
     // console.log("distinct 18 hole years: " +JSON.stringify(this.distinct9)); 
     // console.log(JSON.stringify(this.scores));
      
      // this.scores = this.allScore;
       this.hcArray = s.scores.handicapArray;
       this.lowScores = s.scores.lowScoresArray;
       this.currentHandicap = this.hcArray[this.hcArray.length -1].handicapIndex;

       this.getHighLow(this.scores, this.allCourses);
       this.getRounds(this.scores);
       this.getHighLowIndex(this.hcArray);

       this.twoAndthree = this.allScore.filter((yr) => ("2" == yr.scoredetail || "3"== yr.scoredetail));
       this.getLevelThree(this.scores);
       this.getHighLowTwoThree(this.scores,this.allCourses);

      // need to sort scores by date
       this.scores.sort((a,b) => {
          if( new Date(a.date) < new Date(b.date)) {return -1}
          if( new Date(a.date) > new Date(b.date)) {return 1}
          return 0;
       });

       this.getScoring(this.scores); 
       
 

    this.rounds = this.scores.length;
    });
  });

  }

}

