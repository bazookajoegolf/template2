import { filter } from 'rxjs/operators';
import { CourseAdminComponent } from './../courseadmin/courseadmin.component';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

import {Course} from '../../../assets/interfaces/interfaces';
import { CoursesService } from '../../../services/courses.service';
import { AlertService } from './../../../services/alert.service';
import { outputAst } from '@angular/compiler';

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
 // active:boolean;
  genderradio:boolean=true;
  inp9:number;
  outp9:number
  ptotal:number;
  iny9:number;
  outy9:number;
  ytotal:number;
  teeid;
 // teecolors =[];
  coursenames = [];
 // testcourse = [{"name":"Tee1"},{"name":"Tee2"},{"name":"Tee3"}]
 // editMode:boolean=false;
 // newTee:boolean=false;
  currentCourse="";
  selectedTee:string;
  selectedGender:string;
  selectedCourseName:string;


  @Input()
  selectedCourse: Course;

  @Input() pushedTee:any;
  @Input() newTee:any;
  @Output() fromTeebuilder= new EventEmitter(); 

  constructor(private courses: CoursesService, private alert: AlertService) { }

  ngOnInit(): void {
    
    this.form = new UntypedFormGroup({
      coursename : new UntypedFormControl('', []),
      teebox     : new UntypedFormControl('', [Validators.required]),
      gender     : new UntypedFormControl('', [Validators.required]),
      holes18    : new UntypedFormControl('', [Validators.required]),
      partotal   : new UntypedFormControl('', [Validators.required]),
      slope	     : new UntypedFormControl('', [Validators.required]),
      rating     : new UntypedFormControl('', [Validators.required]),
      teeactive   : new UntypedFormControl('', [Validators.required]),
      front9p     : new UntypedFormControl('', []),
      back9p     : new UntypedFormControl('', []),
      totalp     : new UntypedFormControl('', []),
      front9y     : new UntypedFormControl('', []),
      back9y    : new UntypedFormControl('', []),
      totaly     : new UntypedFormControl('', []),
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

    console.log(this.selectedCourse?._id + this.selectedCourse?.name);
    console.log(this.pushedTee);
    console.log(this.newTee);

    if(this.pushedTee?.isNew==false) {
      this.teeid = this.pushedTee.tee._id;
      console.log("pushed tee :  "+ this.pushedTee.tee.teeactive);
      this.fillForm(this.pushedTee.tee);
      this.ku_yards();
      this.ku_par();
      console.log("in tee component, tee has been pushed, on changes, what is the current course id:  " + this.selectedCourse._id);
      
    } 

    if(this.pushedTee?.isNew==true) {
      console.log("new tee received from courseadmin, emitted from scorecard:  " +  JSON.stringify(this.newTee));
      this.teeid = "new";
      this.pushedTee=null;
      this.form.reset();
      this.inp9=null;
      this.outp9=null;
      this.outy9=null;
      this.iny9=null;
      this.ptotal=null;
      this.ytotal=null;
      console.log("in tee component, on changes, what is the current course id:  " + this.selectedCourse._id);
    }


    this.enumCourses(this.selectedCourse);
    if(this.currentCourse != this.selectedCourse?.name) {
      // should only happen if courseAdmin pushed a new value down to this component
      if(this.selectedCourse?.tees.length==0) {
        // this will only happen if the course pushed down has no tees
        //this.editMode=true;
      }
      //this.editMode=false;
      //  this.newTee=false;


    }

  
    
  }

  ku_yards() {
    this.outy9 = parseInt(this.form.value.yd1) + parseInt(this.form.value.yd2) + parseInt(this.form.value.yd3)+
    parseInt(this.form.value.yd4)+ parseInt( this.form.value.yd5) + parseInt(this.form.value.yd6)+
    parseInt(this.form.value.yd7) + parseInt(this.form.value.yd8) + parseInt(this.form.value.yd9);

    this.iny9 = parseInt(this.form.value.yd10) + parseInt(this.form.value.yd11) + parseInt(this.form.value.yd12)+ 
     parseInt(this.form.value.yd13) + parseInt(this.form.value.yd14) + parseInt(this.form.value.yd15)+
     parseInt(this.form.value.yd16) + parseInt(this.form.value.yd17) + parseInt(this.form.value.yd18);
     this.ytotal = this.outy9 + this.iny9;
     this.form.patchValue({ 'front9y': this.outy9});
     this.form.patchValue({ 'back9y': this.iny9});
     this.form.patchValue({ 'totaly': this.ytotal});

     console.log(this.iny9);
    
  }

  ku_par() {
    this.outp9 = parseInt(this.form.value.p1) + parseInt(this.form.value.p2)+parseInt(this.form.value.p3)+ 
    parseInt(this.form.value.p4)+parseInt(this.form.value.p5) + parseInt(this.form.value.p6)+
    parseInt(this.form.value.p7) + parseInt(this.form.value.p8)+parseInt(this.form.value.p9);
    this.inp9 = parseInt(this.form.value.p10) + parseInt(this.form.value.p11)+parseInt(this.form.value.p12)+ 
    parseInt(this.form.value.p13)+parseInt(this.form.value.p14) + parseInt(this.form.value.p15)+
    parseInt(this.form.value.p16) + parseInt(this.form.value.p17)+parseInt(this.form.value.p18);
    this.ptotal = this.outp9 + this.inp9;
    this.form.patchValue({ 'front9p': this.outp9});
    this.form.patchValue({ 'back9p': this.inp9});
    this.form.patchValue({ 'totalp': this.ptotal});
  }

  get f() {
    return this.form.controls
    };


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
  sumFront() {
    let x:number = this.pushedTee.p1 + this.pushedTee.p2
    return x;
  }

  onSubmit() {

    this.ku_par();
    this.ku_yards();
    const post = {
      course:this.form.value.name,
      coursename:this.form.value.coursename,
      teebox:this.form.value.teebox,
      courseid:String(this.selectedCourse._id),
      gender:this.form.value.gender,
      holes18:true,
      partotal: this.ptotal,
      front9p     : this.form.value.front9p,
      back9p     : this.form.value.back9p,
      totalp     : this.form.value.totalp,
      front9y     : this.form.value.front9y,
      back9y    : this.form.value.back9y,
      totaly     : this.form.value.totaly,
      slope:  this.form.value.slope,
      rating: this.form.value.rating,
      teeactive: this.form.value.teeactive,
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
    
    console.log("current selected course._id  " + this.selectedCourse._id);
    this.courses.postTee(this.selectedCourse._id,this.teeid,post)
    .subscribe(response => {

      this.alert.success(response.message);
      this.fromTeebuilder.emit("");
      console.log("coursename after doing postTee:  " + this.selectedCourse.name);
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
              gender: coursearray.tees[i].gender
             
            });
    }
    this.coursenames = post;
   // console.log(this.coursenames);
  }

  }

  fillForm(x:any ) {
 
   
    if(x){
      this.form.patchValue({ 'coursename': x.coursename });
      this.form.patchValue({ 'gender': x.gender});
      this.form.patchValue({ 'teebox': x.teebox });
      this.form.patchValue({ 'slope': x.slope });
      this.form.patchValue({ 'rating': x.rating });
      this.form.patchValue({ 'teeactive': x.teeactive });
      this.form.patchValue({ 'p1': x.p1 });
      this.form.patchValue({ 'p2': x.p2 });
      this.form.patchValue({ 'p3': x.p3 });
      this.form.patchValue({ 'p4': x.p4 });
      this.form.patchValue({ 'p5': x.p5 });
      this.form.patchValue({ 'p6': x.p6 });
      this.form.patchValue({ 'p7': x.p7 });
      this.form.patchValue({ 'p8': x.p8 });
      this.form.patchValue({ 'p9': x.p9 });
      this.form.patchValue({ 'p10': x.p10 });
      this.form.patchValue({ 'p11': x.p11 });
      this.form.patchValue({ 'p12': x.p12 });
      this.form.patchValue({ 'p13': x.p13 });
      this.form.patchValue({ 'p14': x.p14 });
      this.form.patchValue({ 'p15': x.p15 });
      this.form.patchValue({ 'p16': x.p16 });
      this.form.patchValue({ 'p17': x.p17 });
      this.form.patchValue({ 'p18': x.p18 });
      this.form.patchValue({ 'yd1': x.yd1 });
      this.form.patchValue({ 'yd2': x.yd2 });
      this.form.patchValue({ 'yd3': x.yd3 });
      this.form.patchValue({ 'yd4': x.yd4 });
      this.form.patchValue({ 'yd5': x.yd5 });
      this.form.patchValue({ 'yd6': x.yd6 });
      this.form.patchValue({ 'yd7': x.yd7 });
      this.form.patchValue({ 'yd8': x.yd8 });
      this.form.patchValue({ 'yd9': x.yd9 });
      this.form.patchValue({ 'yd10': x.yd10 });
      this.form.patchValue({ 'yd11': x.yd11 });
      this.form.patchValue({ 'yd12': x.yd12 });
      this.form.patchValue({ 'yd13': x.yd13 });
      this.form.patchValue({ 'yd14': x.yd14 });
      this.form.patchValue({ 'yd15': x.yd15 });
      this.form.patchValue({ 'yd16': x.yd16 });
      this.form.patchValue({ 'yd17': x.yd17 });
      this.form.patchValue({ 'yd18': x.yd18 });
      this.form.patchValue({ 'h1': x.h1 });
      this.form.patchValue({ 'h2': x.h2 });
      this.form.patchValue({ 'h3': x.h3 });
      this.form.patchValue({ 'h4': x.h4 });
      this.form.patchValue({ 'h5': x.h5 });
      this.form.patchValue({ 'h6': x.h6 });
      this.form.patchValue({ 'h7': x.h7 });
      this.form.patchValue({ 'h8': x.h8 });
      this.form.patchValue({ 'h9': x.h9 });
      this.form.patchValue({ 'h10': x.h10 });
      this.form.patchValue({ 'h11': x.h11 });
      this.form.patchValue({ 'h12': x.h12 });
      this.form.patchValue({ 'h13': x.h13 });
      this.form.patchValue({ 'h14': x.h14 });
      this.form.patchValue({ 'h15': x.h15 });
      this.form.patchValue({ 'h16': x.h16 });
      this.form.patchValue({ 'h17': x.h17 });
      this.form.patchValue({ 'h18': x.h18 });

    }

  }

}
