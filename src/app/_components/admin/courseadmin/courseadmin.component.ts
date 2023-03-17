import { Component, OnChanges, OnInit, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { CoursesService } from '../../../services/courses.service';
import { AlertService } from './../../../services/alert.service';
import { Router } from '@angular/router';
import {Course} from '../../../assets/interfaces/interfaces';



// interface Course {
//   active: boolean;
//   address: string;
//   city: string;
//   country: string;
//   description: String;
//   name: string;
//   url: string;
//   _id: string;

// }



@Component({
  selector: 'app-courseadmin',
  templateUrl: './courseadmin.component.html',
  styleUrls: ['./courseadmin.component.css','./../../../assets/css/bkgd.css']
})
export class CourseAdminComponent implements OnInit, OnChanges{

  course: Course[];

  selectedCourse: Course;
 
  name;
  active:boolean;

  indexnumber=0;

  //@ViewChild('tg') tg: ElementRef;


  constructor(private courses: CoursesService, private router: Router, private alert: AlertService) { }

  ngOnInit() {
   this.active=true; 
   this.getCourses();
  }
  ngOnChanges() {
   
    this.getCourses();
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
  selectCourse(event: Event) {
    // this.name = this.course.name;
    this.name = (event.target as HTMLSelectElement).value;

    const x = this.course.find(o => o.name === this.name);

    this.selectedCourse = x;
   

  }

  tabchange(x) {
    console.log(x);
    this.indexnumber = x;
  }

  // getforminfo(x) {
  //   // console.log(x);
   
    
  // }

  activeCheck() {
     this.active=!this.active;
     this.getCourses();
  }

  fromChild() {
    this.getCourses();
    console.log("Received from child");
  }
  
  fromScorecard(x) {
    console.log("number emitted " + x );
    
    this.indexnumber=x;
  }

}
