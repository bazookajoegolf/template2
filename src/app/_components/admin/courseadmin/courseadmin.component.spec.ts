import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseadminComponent } from './courseadmin.component';

describe('CourseadminComponent', () => {
  let component: CourseadminComponent;
  let fixture: ComponentFixture<CourseadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
