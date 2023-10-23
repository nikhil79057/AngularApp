import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LmsTimeDashboardComponent } from './lms-time-dashboard.component';

describe('LmsTimeDashboardComponent', () => {
  let component: LmsTimeDashboardComponent;
  let fixture: ComponentFixture<LmsTimeDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LmsTimeDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LmsTimeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
