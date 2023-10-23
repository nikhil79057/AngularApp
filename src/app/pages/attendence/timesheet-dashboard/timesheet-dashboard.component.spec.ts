import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetDashboardComponent } from './timesheet-dashboard.component';

describe('TimesheetDashboardComponent', () => {
  let component: TimesheetDashboardComponent;
  let fixture: ComponentFixture<TimesheetDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
