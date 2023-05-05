import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterscoredetailComponent } from './enterscoredetail.component';

describe('EnterscoredetailComponent', () => {
  let component: EnterscoredetailComponent;
  let fixture: ComponentFixture<EnterscoredetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterscoredetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterscoredetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
