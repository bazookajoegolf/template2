import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';

import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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
export class CoursesComponent implements OnInit, OnChanges {
  panelOpenState = false;
  name;
  id;
  form: UntypedFormGroup;
  course: Course[];
  editMode:boolean = false;

@Input()
  selectedCourse: Course;

// @Output()
//   getUpdate = new EventEmitter();  

  @ViewChild('dd') dd: ElementRef;

  constructor(private courses: CoursesService, private router: Router, private alert: AlertService) { }

  ngOnInit() {
    this.form = new UntypedFormGroup({
      name: new UntypedFormControl('', [Validators.required, Validators.min(2), Validators.max(50)]),
      address: new UntypedFormControl('', []),
      city: new UntypedFormControl('', [Validators.required, Validators.min(3), Validators.max(50)]),
      url: new UntypedFormControl('', []),
      createDate: new UntypedFormControl('', [Validators.required]),
      active: new UntypedFormControl('', [Validators.required]),
      description: new UntypedFormControl('', []),

    });
    this.form.disable();

    //this.selectCourse(this.selectedCourse);
    
  }

  ngOnChanges(changes: SimpleChanges): void {

    if(this.selectedCourse) {
      this.selectCourse(this.selectedCourse);
      this.name = this.selectedCourse.name;
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
    this.form.patchValue({ 'url': x.url });
    this.form.patchValue({ 'description': x.description });
    this.form.patchValue({ 'active': x.active });
    this.id = x._id;
  }

  // getCourses() {

  //   this.courses.getCourses()
  //     .subscribe((courses) => {
  //       if (courses) {
  //         this.course = courses;
  //       }
  //     }, (error) => {
  //       this.alert.error(error.error.message);
  //     });

  // }

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
    //    this.getUpdate.emit("Saved!");
        //this.getCourses();

      },
        (error) => {
          this.alert.error(error.error.message);

        }
      );
    }


  }  //end submit



}







