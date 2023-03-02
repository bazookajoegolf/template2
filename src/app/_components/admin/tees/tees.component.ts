import { CourseAdminComponent } from './../courseadmin/courseadmin.component';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

import {Course} from '../../../assets/interfaces/interfaces';
import { CoursesService } from '../../../services/courses.service';
import { AlertService } from './../../../services/alert.service';
//import { TEECOLORS } from 'src/app/assets/data/teecolors';

@Component({
  selector: 'app-tees',
  templateUrl: './tees.component.html',
  styleUrls: ['./tees.component.css','./../../../assets/css/bkgd.css']
})
export class TeesComponent implements OnInit, OnChanges {

  form:UntypedFormGroup;
  panelOpenState = false;
  name;
  active:boolean=true;
  genderradio:boolean=true;
 // teecolors =[];
  coursenames = [];
  testcourse = [{"name":"Tee1"},{"name":"Tee2"},{"name":"Tee3"}]
  editMode:boolean=false;
  newTee:boolean=false;
  currentCourse="";

  @Input()
  selectedCourse: Course;

  constructor(private courses: CoursesService, private alert: AlertService) { }

  ngOnInit(): void {

    // this.teecolors= TEECOLORS;

    // if there are no tee's, automatically go into edit mode.
    if(!this.selectedCourse) {
      
      this.editMode=true;
    }
    else {
      //enumerate through all the tee colors AND course names and assign to teecolors and coursenames arrays
      // also:  if there are save tees pick the first item and populate form
      //this.enumCourses(this.selectedCourse);
      console.log(this.selectedCourse);

    }

    
    this.form = new UntypedFormGroup({
      coursename : new UntypedFormControl('', []),
      teebox     : new UntypedFormControl('', [Validators.required]),
      gender     : new UntypedFormControl('', [Validators.required]),
      holes18    : new UntypedFormControl('', [Validators.required]),
      partotal   : new UntypedFormControl('', [Validators.required]),
      slope	     : new UntypedFormControl('', [Validators.required]),
      rating     : new UntypedFormControl('', [Validators.required]),
      isactive   : new UntypedFormControl('', [Validators.required]),
      p1: new UntypedFormControl('', [Validators.required, Validators.min(3), Validators.max(9)]),
      p2: new UntypedFormControl('', [Validators.required, Validators.min(3), Validators.max(9)]),
      p3: new UntypedFormControl('', [Validators.required, Validators.min(3), Validators.max(9)]),
      p4: new UntypedFormControl('', [Validators.required, Validators.min(3), Validators.max(9)]),
      p5: new UntypedFormControl('', [Validators.required, Validators.min(3), Validators.max(9)]),
      p6: new UntypedFormControl('', [Validators.required, Validators.min(3), Validators.max(9)]),
      p7: new UntypedFormControl('', [Validators.required, Validators.min(3), Validators.max(9)]),
      p8: new UntypedFormControl('', [Validators.required, Validators.min(3), Validators.max(9)]),
      p9: new UntypedFormControl('', [Validators.required, Validators.min(3), Validators.max(9)]),
      p10: new UntypedFormControl('', [Validators.required, Validators.min(3), Validators.max(9)]),
      p11: new UntypedFormControl('', [Validators.required, Validators.min(3), Validators.max(9)]),
      p12: new UntypedFormControl('', [Validators.required, Validators.min(3), Validators.max(9)]),
      p13: new UntypedFormControl('', [Validators.required, Validators.min(3), Validators.max(9)]),
      p14: new UntypedFormControl('', [Validators.required, Validators.min(3), Validators.max(9)]),
      p15: new UntypedFormControl('', [Validators.required, Validators.min(3), Validators.max(9)]),
      p16: new UntypedFormControl('', [Validators.required, Validators.min(3), Validators.max(9)]),
      p17: new UntypedFormControl('', [Validators.required, Validators.min(3), Validators.max(9)]),
      p18: new UntypedFormControl('', [Validators.required, Validators.min(3), Validators.max(9)]),
      yd1: new UntypedFormControl('', [Validators.required]),
      yd2: new UntypedFormControl('', [Validators.required]),
      yd3: new UntypedFormControl('', [Validators.required]),
      yd4: new UntypedFormControl('', [Validators.required]),
      yd5: new UntypedFormControl('', [Validators.required]),
      yd6: new UntypedFormControl('', [Validators.required]),
      yd7: new UntypedFormControl('', [Validators.required]),
      yd8: new UntypedFormControl('', [Validators.required]),
      yd9: new UntypedFormControl('', [Validators.required]),
      yd10: new UntypedFormControl('', [Validators.required]),
      yd11: new UntypedFormControl('', [Validators.required]),
      yd12: new UntypedFormControl('', [Validators.required]),
      yd13: new UntypedFormControl('', [Validators.required]),
      yd14: new UntypedFormControl('', [Validators.required]),
      yd15: new UntypedFormControl('', [Validators.required]),
      yd16: new UntypedFormControl('', [Validators.required]),
      yd17: new UntypedFormControl('', [Validators.required]),
      yd18: new UntypedFormControl('', [Validators.required]),


    });
  }

  ngOnChanges() {
    
    this.enumCourses(this.selectedCourse);
    if(this.currentCourse != this.selectedCourse?.name) {
      // should only happen if courseAdmin pushed a new value down to this component
      if(this.selectedCourse?.tees.length==0) {
        // this will only happen if the course pushed down has no tees
        this.editMode=true;
      }
      this.editMode=false;
      this.newTee=false;
      this.fillForm(this.selectedCourse);

    }
    
  }

  activeCheck() {
    this.active=!this.active;
    //this.getCourses();
 }

  onSubmit() {
    const post = {
      course:this.selectedCourse.name,
      coursename:this.form.value.coursename,
      teebox:this.form.value.teebox,
      gender:this.form.value.gender,
      holes18:true,
      partotal: 72, //this.form.value.partotal,
      slope:122, //this.form.value.slope,
      rating: 71.1, // this.form.value.rating,
      isactive:this.form.value.isactive,
      p1: this.form.value.p1,
      p2: this.form.value.p2,
      p3: this.form.value.p3,
      p4: this.form.value.p4,
      p5: this.form.value.p5,
      p6: this.form.value.p6,
      p7: this.form.value.p7,
      p8: this.form.value.p8,
      p9: this.form.value.p9,
      p10: this.form.value.p10,
      p11: this.form.value.p11,
      p12: this.form.value.p12,
      p13: this.form.value.p13,
      p14: this.form.value.p14,
      p15: this.form.value.p15,
      p16: this.form.value.p16,
      p17: this.form.value.p17,
      p18: this.form.value.p18,
      yd1: this.form.value.yd1,
      yd2: this.form.value.yd2,
      yd3: this.form.value.yd3,
      yd4: this.form.value.yd4,
      yd5: this.form.value.yd5,
      yd6: this.form.value.yd6,
      yd7: this.form.value.yd7,
      yd8: this.form.value.yd8,
      yd9: this.form.value.yd9,
      yd10: this.form.value.yd10,
      yd11: this.form.value.yd11,
      yd12: this.form.value.yd12,
      yd13: this.form.value.yd13,
      yd14: this.form.value.yd14,
      yd15: this.form.value.yd15,
      yd16: this.form.value.yd16,
      yd17: this.form.value.yd17,
      yd18: this.form.value.yd18,



    }
    
    this.courses.postTee(this.selectedCourse._id,"new",post)
    .subscribe(response => {

      this.alert.success(response.message);

   //   //this.getCourses();
    },
      (error) => {
        this.alert.error(error.error.message);

      }
    );

  }

  enumCourses(coursearray:Course) {
    if(coursearray) {
      let post=[];
      for(var i=0;i < coursearray.tees.length;i++) {
              post.push( {coursename: coursearray.tees[i].coursename,
              teebox: coursearray.tees[i].teebox,
              gender: coursearray.tees[i].gender,
              isactive: coursearray.tees[i].isactive
            });
    }
    this.coursenames = post;
    console.log(this.coursenames);
  }

  }

  fillForm(x) {
    if(x){
      this.form.patchValue({ 'isactive': x.tees[0].isactive });
    }

  }

}
