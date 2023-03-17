import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';

import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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
  panelOpenState = false;
  name;
  id;
  form: UntypedFormGroup;
  course: Course[];
  editMode:boolean = false;
  keywords=[];

@Input()
  selectedCourse: Course;

@Output("fromChild") fromChild:EventEmitter<any> = new EventEmitter();  

  @ViewChild('dd') dd: ElementRef;

  constructor(private courses: CoursesService, private router: Router, private alert: AlertService) { }

  ngOnInit() {
    this.form = new UntypedFormGroup({
      name: new UntypedFormControl('', [Validators.required, Validators.min(2), Validators.max(50)]),
      address: new UntypedFormControl('', []),
      city: new UntypedFormControl('', [Validators.required, Validators.min(3), Validators.max(50)]),
      country: new UntypedFormControl('', [Validators.required]),
      url: new UntypedFormControl('', []),
      createDate: new UntypedFormControl('', [Validators.required]),
      active: new UntypedFormControl('', [Validators.required]),
      description: new UntypedFormControl('', []),
      coursenames : new UntypedFormControl('', []),
      teecolors : new UntypedFormControl('', []),

    });
    this.form.disable();

    //this.selectCourse(this.selectedCourse);
    
  }

  ngOnChanges(changes: SimpleChanges): void {

    if(this.selectedCourse) {
      this.selectCourse(this.selectedCourse);
      this.name = this.selectedCourse.name;
      this.form.disable();
    }  
    


  }
  get f() {
    return this.form.controls
    };


  // selectedCourse($event: any){
  //   console.log("receiving event from Output of parent");
  // }  

  selectCourse(y:Course) {
    // this.name = this.course.name;
    //this.name = (event.target as HTMLSelectElement).value;
    const x = y;

    this.form.patchValue({ 'name': x.name });
    this.form.patchValue({ 'address': x.address });
    this.form.patchValue({ 'city': x.city });
    this.form.patchValue({ 'country': x?.country });
    this.form.patchValue({ 'url': x.url });
    this.form.patchValue({ 'description': x.description });
    this.form.patchValue({ 'active': x.active });
    this.form.patchValue({ 'coursenames': x.coursenames });
    this.form.patchValue({ 'teecolors': x.teecolors });
    this.id = x._id;
  }

  onNew() {
    this.form.enable();
    this.form.reset();

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
    this.form.disable();
     this.editMode=false;
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
    console.log(post);
    if(this.editMode) {
      this.courses.updateCourse(this.id,post)
      .subscribe(response => {
        this.alert.success("Settings Saved!");
        this.form.disable();
        this.editMode=false;
        this.fromChild.emit();
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
        this.alert.success("Settings Saved!");
        this.form.disable();
        this.editMode=false;
        this.fromChild.emit();
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
      this.selectedCourse.coursenames.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  add2(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.selectedCourse.teecolors.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  removeKeyword(keyword: string) {
    const index = this.selectedCourse.coursenames.indexOf(keyword);
    if (index >= 0) {
      this.selectedCourse.coursenames.splice(index, 1);
    }
  }

  removeKeyword2(keyword: string) {
    const index = this.selectedCourse.teecolors.indexOf(keyword);
    if (index >= 0) {
      this.selectedCourse.teecolors.splice(index, 1);
    }
  }



}







