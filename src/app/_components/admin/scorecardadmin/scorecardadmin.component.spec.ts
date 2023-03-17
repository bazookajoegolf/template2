import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorecardadminComponent } from './scorecardadmin.component';

describe('ScorecardadminComponent', () => {
  let component: ScorecardadminComponent;
  let fixture: ComponentFixture<ScorecardadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScorecardadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScorecardadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
