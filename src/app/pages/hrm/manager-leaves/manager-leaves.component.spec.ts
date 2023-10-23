import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerLeavesComponent } from './manager-leaves.component';

describe('ManagerLeavesComponent', () => {
  let component: ManagerLeavesComponent;
  let fixture: ComponentFixture<ManagerLeavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerLeavesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
