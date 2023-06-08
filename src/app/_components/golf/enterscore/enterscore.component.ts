import { Component, OnChanges, OnInit, ElementRef, SimpleChanges } from '@angular/core';
import { CoursesService } from '../../../services/courses.service';
import { AlertService } from './../../../services/alert.service';
import { Router } from '@angular/router';
import {Course} from '../../../assets/interfaces/interfaces';
//import { UntypedFormControl,UntypedFormGroup} from '@angular/forms';

@Component({
  selector: 'app-enterscore',
  templateUrl: './enterscore.component.html',
  styleUrls: ['./enterscore.component.css']
})
export class EnterscoreComponent implements OnInit , OnChanges {

  course: Course[];
 // form:UntypedFormGroup;
  selectedCourse: Course;
  selectedCourseId;
  countrySelect;
  gender:string; 
  selectedCourseName = [];
  selectedName;
  selectedTee;
  selectedDate;
  pushToESD;
  teebox=[];
  today:Date;

  id;

  constructor(private courses: CoursesService, private router: Router, private alert: AlertService) {}


  ngOnInit() {
   //this.active=true; 
   //this.chosenCourse="Maple Ridge";
   this.gender=localStorage.getItem('gender');
   this.countrySelect="all";

   this.today = new Date();
   this.getCourses();

  //  this.form = new UntypedFormGroup({
  //   coursename : new UntypedFormControl('', []),

  // });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getCourses();
      
  }

  getCourses() {

    this.courses.getCourses()
      .subscribe((courses) => {
        
        var x=[];

        for(var i=0; i < courses.length;i++) {
          if(this.countrySelect=="all") {
             if(courses[i].active==true ){
               x.push(courses[i]);
             }
             this.course = x;
            }
        
          else {
            if(courses[i].active==true && courses[i].country== this.countrySelect){
              x.push(courses[i]);
            }
            this.course = x;
           }
          
        }

       
      });

  }

  selectCourse(event) {

    /////this.id = (event.target as HTMLSelectElement).value;
    // console.log("courseadmin event  " + event.value);
    // console.log("event value "+ event);
    this.selectedTee=null;
    this.teebox=[];
    this.selectedDate=null;
    this.pushToESD=null;
    this.id = event.value;

         const x = this.course.find(o => o._id == this.id );
     // this.newCourse="";
      this.selectedCourse = x;
      this.selectedCourseId = x._id;
      this.selectedCourseName= x.coursenames;
      console.log("course names: " + JSON.stringify(this.selectedCourseName));
  
      // console.log("Gender: " + this.gender.toLowerCase());
      // for(var i=0; i < this.selectedCourse?.tees.length;i++) {
      //   if(this.gender.toLowerCase() == this.selectedCourse.tees[i].gender) {
      //     console.log("pushing in tee");
      //     this.teebox.push(this.selectedCourse.tees[i]);
      //   }

      // }
      // console.log("Tees avail for gender: " + this.teebox.length);

     //console.log("in score entry, value of selectedCourse " + JSON.stringify(this.selectedCourse));
    } 

    getTees(event) {
      this.selectedName = event.value;
      console.log(this.selectedName);
           for(var i=0; i < this.selectedCourse?.tees.length;i++) {
        if(this.selectedCourse.tees[i].coursename == this.selectedName 
           && this.selectedCourse.tees[i].gender == this.gender.toLowerCase()) {
          console.log("pushing in tee");
          this.teebox.push(this.selectedCourse.tees[i]);
        }

      }
      console.log("Tees avail for gender: " + this.teebox.length);

    }
    selectTee(event) {
      this.selectedTee=event.value;
      if(this.selectedDate) {
        this.pushToESD= {course:this.selectedCourseId,name: this.selectedCourse.name,tee:this.selectedTee,date:this.selectedDate};
      }

    }
  
    addEvent(x, event) {
      // once date is added push the value to enterscoredetail
      console.log(event.value);
      this.selectedDate= event.value
      this.pushToESD= {course:this.selectedCourseId,name: this.selectedCourse.name,tee:this.selectedTee,date:this.selectedDate};
    }

  filterCourse(event) {
    this.countrySelect = event.value;
    console.log("country select: " + this.countrySelect);
    this.getCourses();
  }

}
