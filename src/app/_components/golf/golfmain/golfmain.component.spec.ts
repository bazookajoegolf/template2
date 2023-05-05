import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GolfmainComponent } from './golfmain.component';

describe('GolfmainComponent', () => {
  let component: GolfmainComponent;
  let fixture: ComponentFixture<GolfmainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GolfmainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GolfmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
