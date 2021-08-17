import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SnackstatusComponent } from './snackstatus.component';

describe('SnackstatusComponent', () => {
  let component: SnackstatusComponent;
  let fixture: ComponentFixture<SnackstatusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
