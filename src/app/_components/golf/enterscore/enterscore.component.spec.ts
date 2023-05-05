import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterscoreComponent } from './enterscore.component';

describe('EnterscoreComponent', () => {
  let component: EnterscoreComponent;
  let fixture: ComponentFixture<EnterscoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterscoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
