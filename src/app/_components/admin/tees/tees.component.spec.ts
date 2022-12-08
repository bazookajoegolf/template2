import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeesComponent } from './tees.component';

describe('TeesComponent', () => {
  let component: TeesComponent;
  let fixture: ComponentFixture<TeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
