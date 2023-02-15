import { Component,OnChanges,OnInit} from '@angular/core';
import { CoursesService } from '../../../services/courses.service';
import { AlertService } from './../../../services/alert.service';
import { Router } from '@angular/router';



interface Course {
  active: boolean;
  address: string;
  city: string;
  country: string;
  description: String;
  name: string;
  url: string;
  _id: string;

}



@Component({
  selector: 'app-courseadmin',
  templateUrl: './courseadmin.component.html',
  styleUrls: ['./courseadmin.component.css','./../../../assets/css/bkgd.css']
})
export class CourseAdminComponent implements OnInit, OnChanges{

  course: Course[];

  selectedCourse: Course;
 
  name;

  constructor(private courses: CoursesService, private router: Router, private alert: AlertService) { }

  ngOnInit() {
   this.getCourses();
  }
  ngOnChanges() {
    console.log("change detected");
    this.getCourses();
  }

  getCourses() {

    this.courses.getCourses()
      .subscribe((courses) => {
        if (courses) {
          this.course = courses;
          }
      }, (error) => {
        this.alert.error(error.error.message);
      });

  }

  selectCourse(event: Event) {
    // this.name = this.course.name;
    this.name = (event.target as HTMLSelectElement).value;

    const x = this.course.find(o => o.name === this.name);

    this.selectedCourse = x;
   //console.log("course selected  ", x);

  }

  fromChild() {
    this.getCourses();
    console.log("Received from child");
  }

}
