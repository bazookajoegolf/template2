import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResetAckComponent } from './reset-ack.component';

describe('ResetAckComponent', () => {
  let component: ResetAckComponent;
  let fixture: ComponentFixture<ResetAckComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetAckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetAckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
