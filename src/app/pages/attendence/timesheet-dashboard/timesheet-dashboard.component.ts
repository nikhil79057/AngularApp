import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewTimesheetComponent } from '../forms/add-new-timesheet/add-new-timesheet.component';

@Component({
  selector: 'app-timesheet-dashboard',
  templateUrl: './timesheet-dashboard.component.html',
  styleUrls: ['./timesheet-dashboard.component.scss']
})
export class TimesheetDashboardComponent {
  ModalOpen: boolean;
   constructor(private dialog: MatDialog) {}

  // dialog code


  openmodel() {
    console.log('fun call');
    this.ModalOpen = true;
   }



  cancel() {
    this.ModalOpen = false;
  }

}
