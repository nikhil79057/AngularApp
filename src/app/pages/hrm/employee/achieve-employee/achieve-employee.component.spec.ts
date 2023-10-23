import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchieveEmployeeComponent } from './achieve-employee.component';

describe('AchieveEmployeeComponent', () => {
  let component: AchieveEmployeeComponent;
  let fixture: ComponentFixture<AchieveEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchieveEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchieveEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
