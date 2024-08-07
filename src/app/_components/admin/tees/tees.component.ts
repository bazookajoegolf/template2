import { LoginComponent } from './../../profile/login/login.component';
import { filter } from 'rxjs/operators';
import { CourseAdminComponent } from './../courseadmin/courseadmin.component';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

import { UntypedFormControl,FormControl, UntypedFormGroup, Validators } from '@angular/forms';

import {Course} from '../../../assets/interfaces/interfaces';
import { CoursesService } from '../../../services/courses.service';
import { AlertService } from './../../../services/alert.service';

//import { outputAst } from '@angular/compiler';

//import { TEECOLORS } from 'src/app/assets/data/teecolors';

@Component({
  selector: 'app-tees',
  templateUrl: './tees.component.html',
  styleUrls: ['./tees.component.css','./../../../assets/css/bkgd.css']
})
export class TeesComponent implements OnInit, OnChanges {

  form:UntypedFormGroup;
  //panelOpenState = false;
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
  selectedTeeColors=[];
  selectedCourse:any;
  eighteen:boolean;


  @Input() pushedTee:any;
  @Output() fromTeebuilder= new EventEmitter(); 

  constructor(private courses: CoursesService, private alert: AlertService) { }

  ngOnInit(): void {
    
    this.form = new UntypedFormGroup({
      coursename : new UntypedFormControl('', [Validators.required]),
      teebox     : new UntypedFormControl('', [Validators.required]),
      gender     : new UntypedFormControl('', [Validators.required]),
      holes18    : new UntypedFormControl('', [Validators.required]),
      partotal   : new UntypedFormControl('', []),
      slope	     : new UntypedFormControl('', [Validators.required,Validators.pattern('^[0-9]*(\.)?([0-9]{1})?$')]),
      rating     : new UntypedFormControl('', [Validators.required,Validators.pattern('^[0-9]*(\.)?([0-9]{1})?$')]),
      f9slope	     : new UntypedFormControl('', [Validators.pattern('^[0-9]*(\.)?([0-9]{1})?$')]),
      f9rating     : new UntypedFormControl('', [Validators.pattern('^[0-9]*(\.)?([0-9]{1})?$')]),
      b9slope	     : new UntypedFormControl('', [Validators.pattern('^[0-9]*(\.)?([0-9]{1})?$')]),
      b9rating     : new UntypedFormControl('', [Validators.pattern('^[0-9]*(\.)?([0-9]{1})?$')]),
      teeactive   : new UntypedFormControl('', []),
      front9p     : new UntypedFormControl('', []),
      back9p     : new UntypedFormControl('', []),
      totalp     : new UntypedFormControl('', []),
      front9y     : new UntypedFormControl('', []),
      back9y    : new UntypedFormControl('', []),
      totaly     : new UntypedFormControl('', []),
      p1: new UntypedFormControl('', [Validators.required, Validators.min(3), Validators.max(9),Validators.pattern('^[0-9]*$')]),
      p2: new UntypedFormControl('', [Validators.required, Validators.min(3), Validators.max(9),Validators.pattern('^[0-9]*$')]),
      p3: new UntypedFormControl('', [Validators.required, Validators.min(3), Validators.max(9),Validators.pattern('^[0-9]*$')]),
      p4: new UntypedFormControl('', [Validators.required, Validators.min(3), Validators.max(9),Validators.pattern('^[0-9]*$')]),
      p5: new UntypedFormControl('', [Validators.required, Validators.min(3), Validators.max(9),Validators.pattern('^[0-9]*$')]),
      p6: new UntypedFormControl('', [Validators.required, Validators.min(3), Validators.max(9),Validators.pattern('^[0-9]*$')]),
      p7: new UntypedFormControl('', [Validators.required, Validators.min(3), Validators.max(9),Validators.pattern('^[0-9]*$')]),
      p8: new UntypedFormControl('', [Validators.required, Validators.min(3), Validators.max(9),Validators.pattern('^[0-9]*$')]),
      p9: new UntypedFormControl('', [Validators.required, Validators.min(3), Validators.max(9),Validators.pattern('^[0-9]*$')]),
      p10: new UntypedFormControl('', [Validators.required, Validators.min(3), Validators.max(9),Validators.pattern('^[0-9]*$')]),
      p11: new UntypedFormControl('', [Validators.required, Validators.min(3), Validators.max(9),Validators.pattern('^[0-9]*$')]),
      p12: new UntypedFormControl('', [Validators.required, Validators.min(3), Validators.max(9),Validators.pattern('^[0-9]*$')]),
      p13: new UntypedFormControl('', [Validators.required, Validators.min(3), Validators.max(9),Validators.pattern('^[0-9]*$')]),
      p14: new UntypedFormControl('', [Validators.required, Validators.min(3), Validators.max(9),Validators.pattern('^[0-9]*$')]),
      p15: new UntypedFormControl('', [Validators.required, Validators.min(3), Validators.max(9),Validators.pattern('^[0-9]*$')]),
      p16: new UntypedFormControl('', [Validators.required, Validators.min(3), Validators.max(9),Validators.pattern('^[0-9]*$')]),
      p17: new UntypedFormControl('', [Validators.required, Validators.min(3), Validators.max(9),Validators.pattern('^[0-9]*$')]),
      p18: new UntypedFormControl('', [Validators.required, Validators.min(3), Validators.max(9),Validators.pattern('^[0-9]*$')]),
      yd1: new UntypedFormControl('', [Validators.required, Validators.min(10), Validators.max(999),Validators.pattern('^[0-9]*$')]),
      yd2: new UntypedFormControl('', [Validators.required, Validators.min(10), Validators.max(999),Validators.pattern('^[0-9]*$')]),
      yd3: new UntypedFormControl('', [Validators.required, Validators.min(10), Validators.max(999),Validators.pattern('^[0-9]*$')]),
      yd4: new UntypedFormControl('', [Validators.required, Validators.min(10), Validators.max(999),Validators.pattern('^[0-9]*$')]),
      yd5: new UntypedFormControl('', [Validators.required, Validators.min(10), Validators.max(999),Validators.pattern('^[0-9]*$')]),
      yd6: new UntypedFormControl('', [Validators.required, Validators.min(10), Validators.max(999),Validators.pattern('^[0-9]*$')]),
      yd7: new UntypedFormControl('', [Validators.required, Validators.min(10), Validators.max(999),Validators.pattern('^[0-9]*$')]),
      yd8: new UntypedFormControl('', [Validators.required, Validators.min(10), Validators.max(999),Validators.pattern('^[0-9]*$')]),
      yd9: new UntypedFormControl('', [Validators.required, Validators.min(10), Validators.max(999),Validators.pattern('^[0-9]*$')]),
      yd10: new UntypedFormControl('', [Validators.required, Validators.min(10), Validators.max(999),Validators.pattern('^[0-9]*$')]),
      yd11: new UntypedFormControl('', [Validators.required, Validators.min(10), Validators.max(999),Validators.pattern('^[0-9]*$')]),
      yd12: new UntypedFormControl('', [Validators.required, Validators.min(10), Validators.max(999),Validators.pattern('^[0-9]*$')]),
      yd13: new UntypedFormControl('', [Validators.required, Validators.min(10), Validators.max(999),Validators.pattern('^[0-9]*$')]),
      yd14: new UntypedFormControl('', [Validators.required, Validators.min(10), Validators.max(999),Validators.pattern('^[0-9]*$')]),
      yd15: new UntypedFormControl('', [Validators.required, Validators.min(10), Validators.max(999),Validators.pattern('^[0-9]*$')]),
      yd16: new UntypedFormControl('', [Validators.required, Validators.min(10), Validators.max(999),Validators.pattern('^[0-9]*$')]),
      yd17: new UntypedFormControl('', [Validators.required, Validators.min(10), Validators.max(999),Validators.pattern('^[0-9]*$')]),
      yd18: new UntypedFormControl('', [Validators.required, Validators.min(10), Validators.max(999),Validators.pattern('^[0-9]*$')]),
      h1: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(18),Validators.pattern('^[0-9]*$')]),
      h2: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(18),Validators.pattern('^[0-9]*$')]),
      h3: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(18),Validators.pattern('^[0-9]*$')]),
      h4: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(18),Validators.pattern('^[0-9]*$')]),
      h5: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(18),Validators.pattern('^[0-9]*$')]),
      h6: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(18),Validators.pattern('^[0-9]*$')]),
      h7: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(18),Validators.pattern('^[0-9]*$')]),
      h8: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(18),Validators.pattern('^[0-9]*$')]),
      h9: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(18),Validators.pattern('^[0-9]*$')]),
      h10: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(18),Validators.pattern('^[0-9]*$')]),
      h11: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(18),Validators.pattern('^[0-9]*$')]),
      h12: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(18),Validators.pattern('^[0-9]*$')]),
      h13: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(18),Validators.pattern('^[0-9]*$')]),
      h14: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(18),Validators.pattern('^[0-9]*$')]),
      h15: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(18),Validators.pattern('^[0-9]*$')]),
      h16: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(18),Validators.pattern('^[0-9]*$')]),
      h17: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(18),Validators.pattern('^[0-9]*$')]),
      h18: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(18),Validators.pattern('^[0-9]*$')])

    });
  }

  ngOnChanges() {
   // this.form.reset();
   
    console.log("tees tee color length " + this.selectedTeeColors?.length);
    if(this.pushedTee?.isNew==false) {
      this.teeid = this.pushedTee.tee._id;
      this.selectedCourse = this.pushedTee.sc; 
      this.eighteen = this.pushedTee.tee.holes18;  
      this.selectedTeeColors=this.selectedCourse?.teecolors;
      console.log("is this an 18 hole course: " + this.eighteen);
      this.holesSelector(this.eighteen);
      this.fillForm(this.pushedTee.tee, "all");
      this.ku_yards();
      this.ku_par();
      
      //this.selectedTeeColors.push(this.selectedCourse.teebox );
      this.form.get('coursename').disable();
      this.form.get('gender').disable();
      this.form.get('teebox').disable();
      this.form.get('holes18').disable();

     // console.log("in tee, checking to see if i have all the tees:  " + this.selectedCourse?.tees[0].coursename);
     // console.log("in tee component, tee has been pushed, on changes, what is the current course id:  " + this.selectedCourse._id);
      
    } 

    if(this.pushedTee?.isNew==true) {
      
      this.form.reset();
      this.resetNewForm();
         
    }

  }
  resetNewForm() { 
    this.selectedCourse = this.pushedTee.sc;
    this.form.get('coursename')?.enable();
    this.form.get('gender')?.disable();
    this.form.get('teebox')?.disable();
    this.teeid = "new";
    this.inp9=null;
    this.outp9=null;
    this.outy9=null;
    this.iny9=null;
    this.ptotal=null;
    this.ytotal=null;

  }



  ku_yards() {
    this.outy9 = parseInt(this.form.value.yd1) + parseInt(this.form.value.yd2) + parseInt(this.form.value.yd3)+
    parseInt(this.form.value.yd4)+ parseInt( this.form.value.yd5) + parseInt(this.form.value.yd6)+
    parseInt(this.form.value.yd7) + parseInt(this.form.value.yd8) + parseInt(this.form.value.yd9);
    if(this.eighteen) {
      this.iny9 = parseInt(this.form.value.yd10) + parseInt(this.form.value.yd11) + parseInt(this.form.value.yd12)+ 
      parseInt(this.form.value.yd13) + parseInt(this.form.value.yd14) + parseInt(this.form.value.yd15)+
      parseInt(this.form.value.yd16) + parseInt(this.form.value.yd17) + parseInt(this.form.value.yd18);
      this.ytotal = this.outy9 + this.iny9;
      this.form.patchValue({ 'back9y': this.iny9});
    }
    else {
      this.ytotal = this.outy9 ;
    }
     this.form.patchValue({ 'front9y': this.outy9});    
     this.form.patchValue({ 'totaly': this.ytotal});
  }

  ku_par() {
    this.outp9 = parseInt(this.form.value.p1) + parseInt(this.form.value.p2)+parseInt(this.form.value.p3)+ 
    parseInt(this.form.value.p4)+parseInt(this.form.value.p5) + parseInt(this.form.value.p6)+
    parseInt(this.form.value.p7) + parseInt(this.form.value.p8)+parseInt(this.form.value.p9);
    if(this.eighteen) {
    this.inp9 = parseInt(this.form.value.p10) + parseInt(this.form.value.p11)+parseInt(this.form.value.p12)+ 
    parseInt(this.form.value.p13)+parseInt(this.form.value.p14) + parseInt(this.form.value.p15)+
    parseInt(this.form.value.p16) + parseInt(this.form.value.p17)+parseInt(this.form.value.p18);
    }
    if(this.eighteen) {
      this.ptotal = this.outp9 + this.inp9;
      this.form.patchValue({ 'back9p': this.inp9});
    }
    else {
      this.ptotal = this.outp9;
    }
    this.form.patchValue({ 'front9p': this.outp9});
    this.form.patchValue({ 'totalp': this.ptotal});
  }

  get f() {
    return this.form?.controls
    };

    check18(coursename) {
      let foundCourse=false;
      let is18 = null;
      let tees = [];
      let flag = false;
      tees = this.pushedTee.sc.tees;
      for(let i=0;i<tees.length;i++) {
        if(tees[i].coursename == coursename && !flag) {
          foundCourse=true;
          flag = true;
          is18 = tees[i].holes18;
          this.form.patchValue({'holes18': is18});
          console.log("found tee and holes18 = : " + tees[i].holes18 );
        }
      }
      //console.log("outside for loop " + is18);
      return [{"found" :foundCourse,"is18" : is18}];
  
    }

    holesSelector(e) {
      console.log("what is passeid into holesselector: " +typeof e);
      if(typeof e == 'boolean') {this.eighteen= e}
      else {this.eighteen =  e.value}
      let items = ["p10","p11","p12","p13","p14","p15","p16","p17","p18",
                   "yd10","yd11","yd12","yd13","yd14","yd15","yd16","yd17","yd18",
                   "h10","h11","h12","h13","h14","h15","h16","h17","h18"
                  ]
      if(!this.eighteen) {

        for(let i=0;i<items.length;i++) {
          this.form.get(items[i]).removeValidators(Validators.required);
          this.form.get(items[i]).updateValueAndValidity();
        }
      }
      else {
        for(let i=0;i<items.length;i++) {
          this.form.get(items[i]).addValidators(Validators.required);
          this.form.get(items[i]).updateValueAndValidity();
        }

      }
    }

  filterTee(j,k) {
    console.log("filter tee firing "+ j.value);
    if(k==1) {
     // console.log("filterTee triggered on coursename " + j.value);
     let x=[];
      this.selectedCourseName = j.value;
      x = this.check18(j.value);
      console.log ("found previous course: " + x[0].found + " is 18 holes" + x[0].is18);
      if(x[0].found) {
        this.form.patchValue({'holes18': x[0].is18});
        this.form.get('holes18')?.disable()
      }
      else { this.form.get('holes18')?.enable() }
      this.form.get('gender')?.enable();
    }
    if(k==2) {
      this.form.get('teebox')?.enable();
      this.selectedGender=j.value;
      
      this.selectedTeeColors = this.findUsableTee(this.selectedGender,this.selectedCourseName);
      console.log("filter tee running after gender chosen. tee colors available are: " + this.selectedTeeColors);
      this.fillForm(this.pushedTee,"new");
    }
     
  }
 
  onSubmit() {
   // console.log(" coursename  " + this.form.getRawValue().coursename);
    this.ku_par();
    this.ku_yards();
    let c;
    let t;
    let g;
    let e:boolean;
    if(this.pushedTee.isNew==false) {
      c =this.form.getRawValue().coursename;
      t = this.form.getRawValue().teebox;
      g = this.form.getRawValue().gender;
      e = this.form.getRawValue().holes18;

    } else {
      c = this.form.value.coursename;
      t = this.form.value.teebox;
      g = this.form.value.gender;
      e = this.form.getRawValue().holes18;
    }
    const post = {
      course:this.form.value.name,
      coursename:c,
      teebox:t,
      courseid:String(this.selectedCourse._id),
      gender:g,
      holes18:  e,
      partotal: this.ptotal,
      front9p     : this.form.value.front9p,
      back9p     : this.form.value.back9p,
      totalp     : this.form.value.totalp,
      front9y     : this.form.value.front9y,
      back9y    : this.form.value.back9y,
      totaly     : this.form.value.totaly,
      slope:  this.form.value.slope,
      rating: this.form.value.rating,
      f9slope:  this.form.value.f9slope,
      f9rating: this.form.value.f9rating,
      b9slope:  this.form.value.b9slope,
      b9rating: this.form.value.b9rating,

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
    
    //console.log("contents of post in Tees  :  " + JSON.stringify(post)); 
    this.courses.postTee(this.selectedCourse._id,this.teeid,post)
    .subscribe(response => {

      this.alert.success(response.message);
      this.fromTeebuilder.emit({sc : response.course});
     // console.log("name after doing postTee:  " + this.selectedCourse.name);
   //   //this.getCourses();
    },
      (error) => {
        this.alert.error(error.error.message);

      }
    );

  }

  cancelBtn() {
    console.log("cancel button pushed, value of pushedTee" + this.pushedTee.isNew);
    if(this.pushedTee?.isNew==true) {
      this.form.reset();
      this.resetNewForm();
    }
    else {
      this.fillForm(this.pushedTee.tee, "all");
      this.ku_yards();
      this.ku_par();
      this.form.patchValue({ 'teebox': this.pushedTee.tee.teebox });  
    }
  }

  fillTee(evt) {
    //console.log("teeboxes available count " + this.pushedTee.sc?.tees[0].teebox);
    
    for(let i=0;i < this.pushedTee.sc.tees.length;i++) {
      //console.log("teebox colors available " + this.pushedTee.sc.tees[i].teebox);
      
      if(evt.value == this.pushedTee.sc.tees[i].teebox && this.selectedCourseName ==  this.pushedTee.sc.tees[i].coursename) {
        console.log("coursename: " + this.selectedCourseName + " other coursename:  " + this.pushedTee.sc.tees[i].coursename);
        this.form.patchValue({ 'yd1': this.pushedTee.sc.tees[i].yd1 });
        this.form.patchValue({ 'yd2': this.pushedTee.sc.tees[i].yd2 });
        this.form.patchValue({ 'yd3': this.pushedTee.sc.tees[i].yd3 });
        this.form.patchValue({ 'yd4': this.pushedTee.sc.tees[i].yd4 });
        this.form.patchValue({ 'yd5': this.pushedTee.sc.tees[i].yd5 });
        this.form.patchValue({ 'yd6': this.pushedTee.sc.tees[i].yd6 });
        this.form.patchValue({ 'yd7': this.pushedTee.sc.tees[i].yd7 });
        this.form.patchValue({ 'yd8': this.pushedTee.sc.tees[i].yd8 });
        this.form.patchValue({ 'yd9': this.pushedTee.sc.tees[i].yd9 });
        this.form.patchValue({ 'yd10': this.pushedTee.sc.tees[i].yd10 });
        this.form.patchValue({ 'yd11': this.pushedTee.sc.tees[i].yd11 });
        this.form.patchValue({ 'yd12': this.pushedTee.sc.tees[i].yd12 });
        this.form.patchValue({ 'yd13': this.pushedTee.sc.tees[i].yd13 });
        this.form.patchValue({ 'yd14': this.pushedTee.sc.tees[i].yd14 });
        this.form.patchValue({ 'yd15': this.pushedTee.sc.tees[i].yd15 });
        this.form.patchValue({ 'yd16': this.pushedTee.sc.tees[i].yd16 });
        this.form.patchValue({ 'yd17': this.pushedTee.sc.tees[i].yd17 });
        this.form.patchValue({ 'yd18': this.pushedTee.sc.tees[i].yd18 });
        this.form.patchValue({ 'f9slope': this.pushedTee.sc.tees[i].f9slope });
        this.form.patchValue({ 'f9rating': this.pushedTee.sc.tees[i].f9rating });
        this.form.patchValue({ 'b9slope': this.pushedTee.sc.tees[i].b9slope });
        this.form.patchValue({ 'b9rating': this.pushedTee.sc.tees[i].b9rating });
        this.form.patchValue({ 'slope': this.pushedTee.sc.tees[i].slope });
        this.form.patchValue({ 'rating': this.pushedTee.sc.tees[i].rating });
        this.form.patchValue({ 'holes18': this.pushedTee.sc.tees[i].holes18 });
        this.eighteen = this.pushedTee.sc.tees[i].holes18;
      }
      if(this.selectedCourseName ==  this.pushedTee.sc.tees[i].coursename) {
        this.eighteen = this.pushedTee.sc.tees[i].holes18;
        this.form.patchValue({ 'holes18': this.pushedTee.sc.tees[i].holes18 });
        console.log("is course 18: " + this.eighteen);

      }
    }
  }
  
  findUsableTee(g,c) {
    let ar=[];
    for(let i=0;i < this.selectedCourse.teecolors.length;i++) {
      let found = false;
      for(let j=0;j < this.selectedCourse.tees.length;j++) {
      //  console.log("i = " + i + " j = " + j + " teecolor " + this.selectedCourse.teecolors[i] 
        // + " sc teebox color " + this.selectedCourse.tees[j].teebox + " found " 
        // + " gender "+ g+  " coursename " + c + "selectedTeescoursename" + this.selectedCourse.tees[j].teebox +found );
        if(this.selectedCourse.teecolors[i]== this.selectedCourse.tees[j].teebox && 
          g == this.selectedCourse.tees[j].gender && 
          c == this.selectedCourse.tees[j].coursename ){
          found = true;
        }

      }
      if(!found) {ar.push(this.selectedCourse.teecolors[i]);}
      found=false;
      
    }
    return ar;

  }

  fillForm(x:any,y:string ) {
    let ar=[];
    //console.log("is new or all  " +y); 
    //console.table(x);
   
    if(1){
      // console.log("length of selectedcourse tees array" + this.selectedCourse?.tees.length);
      // console.log("coursename, teebox and gender on fill form:  " + x.coursename + x.teebox + x.gender);
      
      
      
      if(y=="all") {
        //console.log("in teesComp, value of holes18: " + x.holes18);
        this.form.patchValue({ 'teebox': x.teebox });
        this.form.patchValue({ 'coursename': x.coursename }); 
        this.form.patchValue({ 'teeactive': x.teeactive});
        this.form.patchValue({ 'gender': x.gender});
        this.form.patchValue({ 'holes18': x.holes18 });
        this.form.patchValue({ 'slope': x.f9slope });
        this.form.patchValue({ 'rating': x.f9rating });
        this.form.patchValue({ 'slope': x.b9slope });
        this.form.patchValue({ 'rating': x.b9rating });
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
        this.form.patchValue({ 'slope': x.slope });
        this.form.patchValue({ 'rating': x.rating });
        this.form.patchValue({ 'f9slope': x.f9slope });
        this.form.patchValue({ 'f9rating': x.f9rating });
        this.form.patchValue({ 'b9slope': x.b9slope });
        this.form.patchValue({ 'b9rating': x.b9rating });
        
        


      }
      if(y=="new") {
       // let z = this.findUsableTee(this.selectedGender, this.selectedCourseName);
       // console.log("selected tee colors " +  this.selectedTeeColors);
        let j = null;
        let i = 0;
        while ( this.selectedCourse?.tees.length > i) {
          
          if(this.selectedCourse?.tees[i].coursename == this.selectedCourseName && !j){
            console.log("a course with a similar name to new tee choice was found. i value is:  " + i );
            j=true;
            x=this.selectedCourse?.tees[i];
          }

          i++;
        };
      //  console.log("Tee Component, new tee,  checking if in tees array exists, if so, checking to see what is set  ");
      //  console.log("selectedCourseName " + this.selectedCourseName + " par1 " + x.p1 );

      }
      if(y=="all" || y=="new") {
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
}
