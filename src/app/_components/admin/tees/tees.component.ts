import { Component, OnInit } from '@angular/core';

import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

import { CoursesService } from '../../../services/courses.service';
import { AlertService } from './../../../services/alert.service';

@Component({
  selector: 'app-tees',
  templateUrl: './tees.component.html',
  styleUrls: ['./tees.component.css']
})
export class TeesComponent implements OnInit {

  form:UntypedFormGroup;
  panelOpenState = false;

  constructor(private courses: CoursesService, private alert: AlertService) { }

  ngOnInit(): void {

    this.form = new UntypedFormGroup({
      par1: new UntypedFormControl('', [Validators.required, Validators.min(3), Validators.max(7)]),
    });




  }

  onSubmit() {

  }

}
