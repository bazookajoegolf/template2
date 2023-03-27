import { Component, OnChanges, OnInit, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { CoursesService } from '../../../services/courses.service';
import { AlertService } from './../../../services/alert.service';
import { Router } from '@angular/router';
import {Course} from '../../../assets/interfaces/interfaces';


@Component({
  selector: 'app-courseadmin',
  templateUrl: './courseadmin.component.html',
  styleUrls: ['./courseadmin.component.css','./../../../assets/css/bkgd.css']
})
export class CourseAdminComponent implements OnInit, OnChanges{

  //course: Course[];
  course: Course[];
  selectedCourse: Course;
  selectedCourseId: string;
  newCourse:string;
  pushedTee:any;
  newTee:string;
 
  name;
  option:Course;
  id;
  active:boolean;

  activetab=true;

  indexnumber=0;

  //@ViewChild('dd') dd: ElementRef;


  constructor(private courses: CoursesService, private router: Router, private alert: AlertService) {}
  ngOnInit() {
   this.active=true; 
   this.getCourses();
   
   

  }
  ngOnChanges() {
    this.getCourses();
    this.selectedCourseId= this.selectedCourseId;
    this.pushTee();
      
  }

  getCourses() {

    this.courses.getCourses()
      .subscribe((courses) => {
        
        var x=[];
        if ( this.active) {
          for(var i=0; i < courses.length;i++) {
            if(courses[i].active==true){
              x.push(courses[i]);
            }
            this.course = x;
          }
        }
        else {
          this.course = courses;
        }
       
      });

  }
  pushTee() {
    this.selectedCourseId = this.selectedCourseId ;
    this.newCourse = "blah";
  }
  
  selectCourse(event: Event) {

    this.id = (event.target as HTMLSelectElement).value;
    console.log("courseadmin id pushed to courses:  " + this.id);
    this.indexnumber=0;

    if(this.name=="newcourse") {
      this.selectedCourseId="newcourse";
      console.log("course id sent from courseadmin to courses:  " + this.selectedCourseId);

    } else {
      this.selectedCourseId=this.id;
      console.log("course id sent from courseadmin to courses:  " + this.selectedCourseId);
      const x = this.course.find(o => o._id == this.id);
      this.newCourse="";
      this.selectedCourse = x;
    } 
  }
 
  blankCourse() {
    //this.selectedCourse._id="";
    const blank:Course={active:true,address:"",city:"",country:"",description:"",name:"",coursenames:[],teecolors:[],
                        url:"",_id:"",front9yd:0,back9yd:0,totalyd:0};
    this.selectedCourse= blank;
  }

  tabchange(x) {
    this.indexnumber = x;
    if(x==1) {this.getCourses()}
    const y = this.course.find(o => o._id == this.id);
    this.selectedCourse = y;
    console.log(this.course);
    console.log(this.selectedCourseId);
  }

  activeCheck() {
     this.active=!this.active;
     this.getCourses();
  }

  fromTeebuilder(x) {
    this.getCourses();
    console.log("Received from child");
    
  }
  fromCourseChild(x) {
    // console.log("Received from Course child " + x);
    // let y= this.course.find(this.selectedCo=> name==x);
     console.log("in fromCourseChild" + JSON.stringify(x));
    // this.option._id= this.selectedCourse._id;
    this.getCourses();
 
  }

  fromScorecard(x) {
    //console.log("number emitted " + x.tabNum + "   course fromScorecard  " + x.tee );
    this.indexnumber=x.tabNum;
    this.pushedTee = x;
  }
  fromScorecardTee(y) {
    this.newTee = y;
    this.indexnumber=y.tabNum;
    console.log("sent from scorecard to courseadmin. " + this.newTee);
  }

}
