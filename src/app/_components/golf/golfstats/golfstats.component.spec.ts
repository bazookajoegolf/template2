import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GolfstatsComponent } from './golfstats.component';

describe('GolfstatsComponent', () => {
  let component: GolfstatsComponent;
  let fixture: ComponentFixture<GolfstatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GolfstatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GolfstatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
