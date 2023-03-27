import { filter } from 'rxjs/operators';
import { Component, Output, Input, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import {Course} from '../../../assets/interfaces/interfaces';
import {colourNameToHex} from '../../../shared/texttohex'
import { CoursesService } from '../../../services/courses.service';
import { AlertService } from './../../../services/alert.service';
import { HeaderRowOutlet } from '@angular/cdk/table';


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
  uniqueM;
  uniqueL;
  extraTeeColors=["darkslateblue","darkslategray","olivedrab", "saddlebrown"]
  constructor() {
    this.numbers = Array.from({length: 18}, (_, i) => i + 1)
  }
// ngOnChanges(changes: SimpleChanges): void {
  ngOnChanges(changes: SimpleChanges): void {
    console.log("scorecardAdmin on changes fired");
    this.mTee=[];
    this.lTee=[];
    this.uniqueL=[];
    this.uniqueM=[];
    this.teeboxColor=[];
    this.courseNames=[];
    if(this.selectedCourse?.tees.length) {
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
        
        this.mTee.push({"coursename":this.selectedCourse?.tees[i].coursename, "index": i});
        console.log(this.selectedCourse?.tees[i].coursename);

        if(this.uniqueM.length > 0){
           this.uniqueM.find( element => {
            if(element.coursename == this.selectedCourse.tees[i].coursename &&
              element.gender == this.selectedCourse.tees[i].gender ) {
                console.log("men's if condition met");
            } else {
              console.log("in mens else");
              this.uniqueM.push(this.selectedCourse.tees[i]);
            }
           });
        } else {
          console.log("no elements");
          this.uniqueM.push(this.selectedCourse.tees[i]);
        }
        
      }
      if(this.selectedCourse?.tees[i].gender == "female") {
        
        this.lTee.push({"coursename":this.selectedCourse?.tees[i].coursename, "index": i});
        if(this.uniqueL.length > 0){
          this.uniqueL.find( element =>{
           if(element.coursename == this.selectedCourse.tees[i].coursename && 
            element.gender == this.selectedCourse.tees[i].gender ) {
           } else {
             this.uniqueL.push(this.selectedCourse.tees[i]);
           }
          });
       } else {
         this.uniqueL.push(this.selectedCourse.tees[i]);
       }
        
      }


     
    }
    //console.log(JSON.stringify(this.mTee));
  }
  console.log("unique mens:  " + this.uniqueM.length);
  console.log("unique ladies:  " + this.uniqueL.length);
      
  }

  @Input()
  selectedCourse: Course;
 

  @Output() fromScorecard:EventEmitter<any> = new EventEmitter(); 
  @Output() fromScorecardTee:EventEmitter<any> = new EventEmitter(); 

  tabNumber;

  sendEditNotice() {
    this.fromScorecard.emit(this.tabNumber=2);
  }

  bgcolor(x) {
    // x is the tee box _id value
    //console.log("value passed " + x + this.teeboxColor[0].b);
    var v =this.teeboxColor.find(item => item.id == x);
    
    return v;
  }
  sendTee(x){
   // console.log("tee being sent " + JSON.stringify(x));
    this.fromScorecard.emit({tabNum:this.tabNumber=2,tee:x,isNew:false});
  }
  newTee(){
    this.fromScorecard.emit({tabNum:this.tabNumber=2,tee:null,isNew:true});
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

