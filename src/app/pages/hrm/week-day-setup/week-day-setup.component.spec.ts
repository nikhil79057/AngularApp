import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekDaySetupComponent } from './week-day-setup.component';

describe('WeekDaySetupComponent', () => {
  let component: WeekDaySetupComponent;
  let fixture: ComponentFixture<WeekDaySetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekDaySetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekDaySetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
