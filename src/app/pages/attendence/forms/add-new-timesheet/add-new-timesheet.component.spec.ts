import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewTimesheetComponent } from './add-new-timesheet.component';

describe('AddNewTimesheetComponent', () => {
  let component: AddNewTimesheetComponent;
  let fixture: ComponentFixture<AddNewTimesheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewTimesheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
