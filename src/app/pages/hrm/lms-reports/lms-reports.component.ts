import { Component, OnInit, ViewChild } from '@angular/core';
import { LmsReportsService } from './lms-reports.service';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import Swal from "sweetalert2";
import html2canvas from 'html2canvas';

import jsPDF from 'jspdf';
import { EmployeeinfoService } from '../employee-info/employeeinfo.service';


@Component({
  selector: 'app-lms-reports',
  templateUrl: './lms-reports.component.html',
  styleUrls: ['./lms-reports.component.scss']
})
export class LmsReportsComponent implements OnInit {

  displayedColumns: string[] = ["EmployeeName", "LeaveType", "leaveUsed", "RemainingLeaves", "TotalLeaves"];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  AllUsers: any;
  ModalOpen: boolean;
  Show: boolean = false;
  FromDate: any;
  toDate: any;
  User_Id: any;
  val: any = 'Month'
  User: any;
  UserName: any;
  UserEmail: any;
  UserDepartment: any;
  Userdesignation: any;
  UserLeaveReport: any;
  UserDetails: any;
  UserDetails_length: any;

  constructor(
    private lmsRepostApi: LmsReportsService,
    private employeeApiInfo: EmployeeinfoService,
  ) { }

  ngOnInit() {
    this.getAllUsers()
  }

  getAllUsers() {
    this.lmsRepostApi.GetAllUsers().subscribe((res) => {
      this.AllUsers = res.user
    })
  }
  selectUsers(val) {
    this.Show = false;
    this.User_Id = val;
    this.employeeApiInfo.GetById(val).subscribe(
      (res) => {
        this.UserDetails = res.employeeList;
        // this.UserDetails_length = res.employeeList.length
      },
      (err) => {
        throw new Error(err);
      }
    );
  }

  selectFromDate(val) {
    this.FromDate = val;
  }
  selectToDate(val) {
    this.toDate = val;
  }

  ShowReport() {
    this.Show = true;
    this.lmsRepostApi.GetReport(this.User_Id, this.FromDate, this.toDate).subscribe((res) => {
      this.User = res.leavePL[0];
      if (res.status == "1") {
        this.dataSource = new MatTableDataSource(res.leavePL);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      } else {
        Swal.fire("Oops..", res.message, "error");
      }
    });
  }

  public captureScreen() {
    var hiddenDiv = document.getElementById("render");
    var contentElement = document.getElementById("content");
    // hiddenDiv.style.display = 'block';
    // contentElement.style.fontSize = "25px"
    // contentElement.style.lineHeight = "25px"

    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      var imgWidth = 210;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png', 1.0)
      var doc = new jsPDF('p', 'mm');
      var position = 0;
      doc.addImage(contentDataURL, "JPEG", 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(contentDataURL, "JPEG", 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pageHeight;
      }
      doc.save('LeaveReport.pdf');
    });
    hiddenDiv.style.display = 'none';
    contentElement.style.fontSize = "14px"
    contentElement.style.lineHeight = "14px"
  }

}


