import { Component, OnChanges, OnInit, AfterViewInit, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { CoursesService } from '../../../services/courses.service';
import { AlertService } from './../../../services/alert.service';
import { Router } from '@angular/router';
import {Course} from '../../../assets/interfaces/interfaces';
import { UntypedFormControl,UntypedFormGroup} from '@angular/forms';


@Component({
  selector: 'app-courseadmin',
  templateUrl: './courseadmin.component.html',
  styleUrls: ['./courseadmin.component.css','./../../../assets/css/bkgd.css']
})
export class CourseAdminComponent implements OnInit, OnChanges{

  //course: Course[];
  form:UntypedFormGroup;

  course: Course[];
 // chosenCourse:string;
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
  activesctab=true;

  indexnumber=0;
  
  @ViewChild('dd') dd: ElementRef;


  constructor(private courses: CoursesService, private router: Router, private alert: AlertService) {}
  ngOnInit() {
   this.active=true; 
   console.log(this.dd);
   //this.chosenCourse="Maple Ridge";
   this.getCourses();

   this.form = new UntypedFormGroup({
    coursename : new UntypedFormControl('', []),

  })

 
   
 //  const form = new FormControl('select');

  }
  ngOnChanges(changes: SimpleChanges): void{
    this.getCourses();
    this.selectedCourseId=this.selectedCourseId;
    this.selectedCourse=this.selectedCourse;  // done to push down to child after receiving data from child

    if(changes.name?.currentValue ) {
      console.log("simple change occurred.");

    }
 
    this.pushTee();
      
  }

  ngOnViewInit() {


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
  getCoursebyName() {

  }
  pushTee() {
    this.selectedCourseId = this.selectedCourseId ;
    //this.newCourse = "blah";
  }
  
  selectCourse(event) {

    /////this.id = (event.target as HTMLSelectElement).value;
   // console.log("courseadmin event  " + event.value);
   // console.log("event value "+ event);
    this.id = event.value;
    this.selectedCourseId = this.id;
    this.indexnumber=0;
   // this.chosenCourse=this.name;
  
    if(this.id=="newcourse") {
      this.selectedCourseId="newcourse";
      console.log("select course event, if new activesctab should turn true");
      this.activesctab=true;
      console.log("activesctab  " + this.activesctab);

    } else {
     // this.selectedCourseId=this.id;
      this.activesctab=false;
     // console.log("course id sent from courseadmin to courses:  " + this.selectedCourseId);
      const x = this.course.find(o => o._id == this.id);
     // this.newCourse="";
      this.selectedCourse = x;
     // console.log("in courses admin, value of selectedCourse " + JSON.stringify(this.selectedCourse));
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
  }

  activeCheck() {
     this.active=!this.active;
     this.getCourses();
  }

  fromTeebuilder(x) {
   // this.getCourses();
  //console.log("from Tees, in fromTeebuilder, value returned: " + JSON.stringify(x));
  this.selectedCourse = x.sc;
    
  }
  fromCourseChild(x) {
    // console.log("Received from Course child " + JSON.stringify(x));
    // let y= this.course.find(this.selectedCo=> name==x);
     
   //  this.chosenCourse=x.name.name;
     //console.log("in fromCourseChild chosen name: " + x.name.name);
    // console.log("in fromCourseChild selectedCourse pushed: " + JSON.stringify(x.name));
    this.getCourses();
     this.selectedCourseId = x.name._id;
     this.selectedCourse = x.name;
     this.activesctab=false;
     this.id = x.name._id;
     this.name = x.name.name;
     this.form.patchValue({ 'coursename': "New Course" });
    
     console.log(this.form.controls["coursename"]);

    // this.option._id= this.selectedCourse._id;
    
  //  console.log("in fromcoursechild, checking item 0 for a to see name and id are valid fields " + this.course[0].name + "  " + this.course[0]._id);
  //  console.log("in fromCourseChild, checking if this is an update, should be false on new course  " + x.updateCourse);

   if(!x.updatedCourse){   
   // console.log("checking to see if course find if is firing");
    
    //const cn = this.course.find( obj => obj.name === x.name);
    // for(let i=0; i < this.course.length;i++) {
    //   console.log("course name " + this.course[i].name );
    //   if(this.course[i].name == x.name) {" course name found in for loop in fromCourseChild"};
    // }

    // console.log("in fromCourseChild. Course is found in course array. the id is: ");

    } 
  }


  fromScorecard(x) {
    //console.log("number emitted " + x.tabNum + "   course fromScorecard  " + x.tee );
    this.indexnumber=x.tabNum;
    this.pushedTee = x;
    
  }
  compareFn(c1: Course, c2: Course): boolean {
    return c1 && c2 ? c1.name === c2.name : c1 === c2;
}
  // fromScorecardTee(y) {
  //   this.newTee = y;
  //   this.indexnumber=y.tabNum;
  //   console.log("sent from scorecard to courseadmin. " + this.newTee);
  // }

}
