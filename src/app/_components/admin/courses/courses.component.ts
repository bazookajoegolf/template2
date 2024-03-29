import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import {COMMA,ENTER} from '@angular/cdk/keycodes';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {MatChipInputEvent} from '@angular/material/chips';


import {Course} from '../../../assets/interfaces/interfaces';
import { CoursesService } from '../../../services/courses.service';
import { AlertService } from './../../../services/alert.service';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnChanges {
 // panelOpenState = false;
  name;
  id;
  form: UntypedFormGroup;
  course: Course;
  editMode:boolean = false;
  newMode:boolean;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  addOnBlur=true;
  //courseKeywords=[];
  //teeKeywords=[];

@Input()
  selectedCourse: Course;
// @Input()
//   newCourse: string;
@Input()
  selectedCourseId: string;

@Output("fromChild") fromChild:EventEmitter<any> = new EventEmitter();  

  @ViewChild('dd') dd: ElementRef;

  constructor(private courses: CoursesService, private router: Router, private alert: AlertService) { }

  ngOnInit() {
    this.form = new UntypedFormGroup({
      name: new UntypedFormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      address: new UntypedFormControl('', []),
      city: new UntypedFormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      country: new UntypedFormControl('', [Validators.required]),
      url: new UntypedFormControl('', [Validators.required]),
      createDate: new UntypedFormControl('', []),
      active: new UntypedFormControl('', [Validators.required]),
      description: new UntypedFormControl('', []),
      coursenames : new UntypedFormControl('[]', [Validators.required]),
      teecolors : new UntypedFormControl('', [Validators.required]),

    });
   // this.form.disable();

    //this.selectCourse(this.selectedCourse);
    
  }

  ngOnChanges(changes: SimpleChanges): void {

    //console.log("courses on changes occurred");
    this.course=null;
    
    if(this.selectedCourseId == "newcourse") {
      
      this.course = this.blankCourse();
      this.selectCourse( this.blankCourse());
      this.form.reset();
    } else if (this.selectedCourseId){
      console.log("selected course id:  " + this.selectedCourseId);
      this.getCoursebyId(this.selectedCourseId) ;
    }
  }

  getCoursebyId(x) {

    if(this.selectedCourseId) {

    this.courses.getCourseId(x)
      .subscribe((courses) => {
          this.course = courses;
          this.selectCourse(this.course);
      });
    }
  }

  get f() {
    return this.form.controls;
    };


  // selectedCourse($event: any){
  //   console.log("receiving event from Output of parent");
  // }  

  selectCourse(y:Course) {

    this.form.patchValue({ 'name': y.name });
    this.form.patchValue({ 'address': y.address });
    this.form.patchValue({ 'city': y.city });
    this.form.patchValue({ 'country': y?.country });
    this.form.patchValue({ 'url': y.url });
    this.form.patchValue({ 'description': y.description });
    this.form.patchValue({ 'active': y.active });
    this.form.patchValue({ 'coursenames': y.coursenames });
    this.form.patchValue({ 'teecolors': y.teecolors});
    if(y._id) {this.id = y._id};
  }

  blankCourse() {
    //this.selectedCourse._id="";
    const blank:Course={active:true,address:"",city:"",country:"",description:"",name:"",coursenames:[],teecolors:[],
                        url:"",_id:"",front9yd:0,back9yd:0,totalyd:0};
    return blank;
  }

  onNew() {
    this.form.enable();
    this.form.reset();
    this.name="";

    // console.log(this.dd.nativeElement.innerText);

  }
  onEdit() {
    this.form.enable();
    this.editMode = true;

    // console.log(this.dd.nativeElement.innerText);

  }

  onDelete() {
    this.editMode=false;
    console.log(this.id);
    this.courses.deleteCourse(this.id)
    .subscribe(response => {
      this.alert.success("Course deleted");
      this.form.disable();
      this.editMode=false;
    //  this.getUpdate.emit("Deleted!");
     // this.getCourses();
    },
      (error) => {
        this.alert.error(error.error.message);

      }
    );
    //this.form.enable();

    // console.log(this.dd.nativeElement.innerText);

  }
  onCancel() {
    this.form.reset();
    //  if(this.newCourse) {
    //   this.blankCourse();
    //  }
        // console.log(this.dd.nativeElement.innerText);

  }

  onSubmit() {

    const post = {
      name: this.form.value.name,
      address: this.form.value.address,
      city: this.form.value.city,
      country: this.form.value.country,
      url: this.form.value.url,
      description: this.form.value.description,
      active: this.form.value.active,
      coursenames : this.form.value.coursenames,
      teecolors : this.form.value.teecolors
    }
   
    if(this.selectedCourseId !="newcourse") {
      this.courses.updateCourse(this.id,post)
      .subscribe(response => {
        this.alert.success("Settings Saved!");
       // this.form.disable();
       // this.editMode=false;
       // console.log("in courses, should be sending the response.name from update:  " + JSON.stringify(response));
        this.fromChild.emit({name:response.course ,updateCourse:true});
       // this.newCourse="";
     //   //this.getCourses();
      },
        (error) => {
          this.alert.error(error.error.message);

        }
      );
    } 
    
    else {
      this.courses.saveCourse(post)
      .subscribe(response => {
        this.alert.success("New Course Saved!");
       // this.form.disable();
       // this.editMode=false;
       //console.log("saving a new course, returned value is   " + JSON.stringify(response.course));
        this.fromChild.emit({name:post,updateCourse:false});
    //    this.getUpdate.emit("Saved!");
        //this.getCourses();

      },
        (error) => {
          this.alert.error(error.error.message);

        }
      );
    }


  }  //end submit

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.course?.coursenames.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  add2(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.course?.teecolors.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  removeKeyword(keyword: string) {
    const index = this.course.coursenames.indexOf(keyword);
    if (index >= 0) {
      this.course.coursenames.splice(index, 1);
    }
  }

  removeKeyword2(keyword: string) {
    const index = this.course.teecolors.indexOf(keyword);
    if (index >= 0) {
      this.course.teecolors.splice(index, 1);
    }
  }



}







