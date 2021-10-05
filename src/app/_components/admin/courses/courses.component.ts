import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CoursesService } from '../../../services/courses.service';
import { AlertService } from './../../../services/alert.service';


interface Course {
  active: boolean;
  address: string;
  city: string;
  description: String;
  name: string;
  url: string;
  _id: string;

}


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  panelOpenState = false;
  name;
  id;
  form: FormGroup;
  course: Course[];
  editMode:boolean = false;

  @ViewChild('dd') dd: ElementRef;

  constructor(private courses: CoursesService, private router: Router, private alert: AlertService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.min(2), Validators.max(50)]),
      address: new FormControl('', []),
      city: new FormControl('', [Validators.required, Validators.min(3), Validators.max(50)]),
      url: new FormControl('', []),
      createDate: new FormControl('', [Validators.required]),
      active: new FormControl('', [Validators.required]),
      description: new FormControl('', []),

    });
    this.form.disable();

    this.getCourses();

  }
  get f() {
    return this.form.controls
    };

  selectCourse(event: Event) {
    // this.name = this.course.name;
    this.name = (event.target as HTMLSelectElement).value;

    const x = this.course.find(o => o.name === this.name);
    console.log(x);
    this.form.patchValue({ 'name': x.name });
    this.form.patchValue({ 'address': x.address });
    this.form.patchValue({ 'city': x.city });
    this.form.patchValue({ 'url': x.url });
    this.form.patchValue({ 'description': x.description });
    this.form.patchValue({ 'active': x.active });
    this.id = x._id;
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

  onNew() {
    this.form.enable();
    this.form.reset();
    this.editMode=false;
    // console.log(this.dd.nativeElement.innerText);

  }
  onEdit() {
    this.form.enable();
    this.editMode = true;

    // console.log(this.dd.nativeElement.innerText);

  }

  onDelete() {
    this.editMode=false;
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
      url: this.form.value.url,
      description: this.form.value.description,
      active: this.form.value.active,
    }

    if(this.editMode) {
      this.courses.updateCourse(this.id,post)
      .subscribe(response => {
        this.alert.success("Settings Saved!");
        this.form.disable();
        this.editMode=false;
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

      },
        (error) => {
          this.alert.error(error.error.message);

        }
      );
    }


  }  //end submit



}







