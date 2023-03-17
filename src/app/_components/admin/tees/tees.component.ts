import { filter } from 'rxjs/operators';
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
 // testcourse = [{"name":"Tee1"},{"name":"Tee2"},{"name":"Tee3"}]
  editMode:boolean=false;
  newTee:boolean=false;
  currentCourse="";
  selectedTee:string;
  selectedGender:string;
  selectedCourseName:string;


  @Input()
  selectedCourse: Course;

  constructor(private courses: CoursesService, private alert: AlertService) { }

  ngOnInit(): void {

    // this.teecolors= TEECOLORS;

    // if there are no tee's, automatically go into edit mode.
    if(!this.selectedCourse) {
      
      this.editMode=true;
      this.newTee = true;
    }
    else {
      //enumerate through all the tee colors AND course names and assign to teecolors and coursenames arrays
      // also:  if there are save tees pick the first item and populate form
      //this.enumCourses(this.selectedCourse);
     // console.log(this.selectedCourse);

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
      yd1: new UntypedFormControl('', [Validators.required, Validators.min(10), Validators.max(999)]),
      yd2: new UntypedFormControl('', [Validators.required, Validators.min(10), Validators.max(999)]),
      yd3: new UntypedFormControl('', [Validators.required, Validators.min(10), Validators.max(999)]),
      yd4: new UntypedFormControl('', [Validators.required, Validators.min(10), Validators.max(999)]),
      yd5: new UntypedFormControl('', [Validators.required, Validators.min(10), Validators.max(999)]),
      yd6: new UntypedFormControl('', [Validators.required, Validators.min(10), Validators.max(999)]),
      yd7: new UntypedFormControl('', [Validators.required, Validators.min(10), Validators.max(999)]),
      yd8: new UntypedFormControl('', [Validators.required, Validators.min(10), Validators.max(999)]),
      yd9: new UntypedFormControl('', [Validators.required, Validators.min(10), Validators.max(999)]),
      yd10: new UntypedFormControl('', [Validators.required, Validators.min(10), Validators.max(999)]),
      yd11: new UntypedFormControl('', [Validators.required, Validators.min(10), Validators.max(999)]),
      yd12: new UntypedFormControl('', [Validators.required, Validators.min(10), Validators.max(999)]),
      yd13: new UntypedFormControl('', [Validators.required, Validators.min(10), Validators.max(999)]),
      yd14: new UntypedFormControl('', [Validators.required, Validators.min(10), Validators.max(999)]),
      yd15: new UntypedFormControl('', [Validators.required, Validators.min(10), Validators.max(999)]),
      yd16: new UntypedFormControl('', [Validators.required, Validators.min(10), Validators.max(999)]),
      yd17: new UntypedFormControl('', [Validators.required, Validators.min(10), Validators.max(999)]),
      yd18: new UntypedFormControl('', [Validators.required, Validators.min(10), Validators.max(999)]),
      h1: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(18)]),
      h2: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(18)]),
      h3: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(18)]),
      h4: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(18)]),
      h5: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(18)]),
      h6: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(18)]),
      h7: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(18)]),
      h8: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(18)]),
      h9: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(18)]),
      h10: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(18)]),
      h11: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(18)]),
      h12: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(18)]),
      h13: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(18)]),
      h14: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(18)]),
      h15: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(18)]),
      h16: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(18)]),
      h17: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(18)]),
      h18: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(18)])

    });
  }

  ngOnChanges() {
    
    this.enumCourses(this.selectedCourse);
    if(this.currentCourse != this.selectedCourse?.name) {
      // should only happen if courseAdmin pushed a new value down to this component
      if(this.selectedCourse?.tees.length==0) {
        // this will only happen if the course pushed down has no tees
        //this.editMode=true;
      }
      //this.editMode=false;
      //  this.newTee=false;
      this.fillForm(this.selectedCourse);

    }
    
  }

  get f() {
    return this.form.controls
    };

  activeCheck() {
    this.active=!this.active;
    //this.getCourses();
 }

  newTeeCheck() {
     this.newTee = !this.newTee;
     this.editMode = true;
  }

  onNew() {
    this.form.enable();
    this.form.reset();
    this.editMode = true;
  }
  onEdit() {
    this.form.enable();
    this.editMode = true;
  }

  filterTee() {
    let x;
     if(this.selectedTee && this.selectedGender && this.selectedCourse){
       x = this.selectedCourse.tees.filter(tee => {
          this.selectedTee && this.selectedGender && this.selectedCourse
        });
        console.log(x);
     } 
     console.log("filter tee triggered");
     
  }

  onSubmit() {

    var p=[];
    var y=[];
    var h=[];

   
      p.push(this.form.value.p1);
      p.push(this.form.value.p2);
      p.push(this.form.value.p3);
      p.push(this.form.value.p4);


   
    console.log(p);
    const post = {
      course:this.selectedCourse.name,
      coursename:this.form.value.coursename,
      teebox:this.form.value.teebox,
      gender:this.form.value.gender,
      holes18:true,
      partotal: this.form.value.partotal,
      slope:  this.form.value.slope,
      rating: this.form.value.rating,
      isactive:this.form.value.isactive,
      par:p,
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
      h1: this.form.value.h1,
      h2: this.form.value.h2,
      h3: this.form.value.h3,
      h4: this.form.value.h4,
      h5: this.form.value.h5,
      h6: this.form.value.h6,
      h7: this.form.value.h7,
      h8: this.form.value.h8,
      h9: this.form.value.h9,
      h10: this.form.value.h10,
      h11: this.form.value.h11,
      h12: this.form.value.h12,
      h13: this.form.value.h13,
      h14: this.form.value.h14,
      h15: this.form.value.h15,
      h16: this.form.value.h16,
      h17: this.form.value.h17,
      h18: this.form.value.h18
    }
    
    console.log(post);

    this.courses.postTee(this.selectedCourse._id,"new",post)
    .subscribe(response => {

      this.alert.success(response.message);
      this.form.disable();
      this.editMode=false;
      this.newTee= false;

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
   // console.log(this.coursenames);
  }

  }

  fillForm(x:Course) {
    // const y;
    // if(x._id){
    //    y = x.tees[0];
    // }
    //   this.form.patchValue({ 'isactive': this.y.isactive });
    // }

  }

}
