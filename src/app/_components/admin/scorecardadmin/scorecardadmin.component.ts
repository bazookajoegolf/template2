import { filter } from 'rxjs/operators';
import { Component, Output, Input, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import {Course} from '../../../assets/interfaces/interfaces';
import {colourNameToHex} from '../../../shared/texttohex'
import { CoursesService } from '../../../services/courses.service';
import { AlertService } from './../../../services/alert.service';
import { HeaderRowOutlet } from '@angular/cdk/table';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'app-scorecardadmin',
  templateUrl: './scorecardadmin.component.html',
  styleUrls: ['./scorecardadmin.component.css']
})
export class ScorecardadminComponent implements OnChanges {
  numbers;
  isColor;
  colorIndex=0;
  enumGender=["male","female"];
  courseNames=[];
  teeboxColor=[];
  blankLines=[0,1,2,3];
  mTee;
  lTee;
  umt;
  ult;
  uniqueM;
  uniqueL;
  extraTeeColors=["darkslateblue","darkslategray","olivedrab", "saddlebrown"];

  @Input()
  selectedCourse: Course;
 

  @Output() fromScorecard:EventEmitter<any> = new EventEmitter(); 
  //@Output() fromScorecardTee:EventEmitter<any> = new EventEmitter(); 

  tabNumber;

  constructor() {
    this.numbers = Array.from({length: 18}, (_, i) => i + 1)
  }
// ngOnChanges(changes: SimpleChanges): void {
  ngOnChanges(changes: SimpleChanges): void {
    //console.log("scorecardAdmin on changes fired");
    this.mTee=[];  // contains all mens tees for selected course
    this.lTee=[];  // contains all ladies tees for selected course
    this.uniqueL=[];  // contains 1 entry per course ladies
    this.uniqueM=[];  // contains 1 entry per course mens
    this.umt=[];
    this.ult=[];
    this.teeboxColor=[];
    this.courseNames=[]; // courseNames is the main out loop in html page
    if(this.selectedCourse.tees?.length) {
    for(let i=0; i < this.selectedCourse?.tees.length;i++) {
      //console.log (this.selectedCourse.tees[i]._id);
      let x = this.checkColor(this.selectedCourse?.tees[i].teebox);

      let y= this.courseNames.find((post, index)=> {
          if(post == this.selectedCourse?.tees[i].coursename)
        return true
      });
      
      if(!y) this.courseNames.push(this.selectedCourse?.tees[i].coursename);
      
      this.teeboxColor.push({"b":this.checkColor(this.selectedCourse?.tees[i].teebox), "c": colourNameToHex(x),
                            "id":this.selectedCourse?.tees[i]._id});


      if(this.selectedCourse?.tees[i].gender == "male") {

       this.mTee.push(this.selectedCourse?.tees[i]);
        
      }
      if(this.selectedCourse?.tees[i].gender == "female") {

        this.lTee.push(this.selectedCourse?.tees[i]);
      }   
    }
  }
  for(let i=0; i < this.mTee.length;i++){
    let mt=this.mTee[i].coursename;
    let localumt=null;
    let found = false;
    let x=this.umt;  // searching for unique course
    
    for(let j=0;j < x.length;j++) {
      localumt= x[j].coursename;
    //  console.log("contents of localumt " + localumt + " contents of umt " + x[j].coursename);
      if(localumt== mt) {    // comparing the mtee course array coursename to the local list being generated
        found=true;
     //   console.log("a match was found;")
      }
    }
    if(!found) {
      this.umt.push({"coursename": mt});
      this.uniqueM.push(this.mTee[i]);
    }
  }
//  console.log("Length of lTee.  Should be a full list of ladies tees. " + this.lTee.length);
  let xx=[];
  for(let i=0; i < this.lTee.length;i++){

    let lt=this.lTee[i].coursename;
    let localult=null;
    let found = false;
    //let xx=this.ult;
    
    console.log("lTee value coursename: " + lt + " length of xx " + xx.length );
    
    for(let j=0;j < xx.length;j++) {
      localult= xx[j].coursename;
      console.log("contents of localult " + localult + " contents of umt " + xx[j].coursename + " xx length " + xx.length);
      if(localult== lt) {
        found=true;
      }
    }
    if(!found) {
      console.log("Unique course pushed.  ")
      xx.push(this.lTee[i]);
      this.ult.push({"coursename": lt});
      this.uniqueL.push(this.lTee[i]);
    }
    found==false;
  }
     console.log("value of xx " + xx.length);
  }



  bgcolor(x) {
    // x is the tee box _id value
    //console.log("value passed " + x + this.teeboxColor[0].b);
    var v =this.teeboxColor.find(item => item.id == x);
    
    return v;
  }
  sendTee(x){
   //console.log("tee being sent " + JSON.stringify(x));
    this.fromScorecard.emit({tabNum:this.tabNumber=2,tee:x,isNew:false, sc:this.selectedCourse});
  }
  newTee(){
    this.fromScorecard.emit({tabNum:this.tabNumber=2,tee:null,isNew:true,sc:this.selectedCourse});
  }

  checkColor(strColor:string){
    if(strColor) {
    var s = new Option().style;
    var x;
    //console.log(strColor);
    s.color = strColor;
     if(s.color == strColor.toLowerCase()) {
       this.isColor=strColor;
       //console.log(strColor + "object type: " + typeof strColor);
       x = strColor.toLowerCase();
     }
     else {
      if(this.colorIndex==3) {this.colorIndex=0;}
      else {this.colorIndex++;}
       
       x = this.extraTeeColors[this.colorIndex];
       //console.log("only else is firing " + x);
     }
    } 
     return x;
  }

  // below functions determine if text color should be white or black



}

