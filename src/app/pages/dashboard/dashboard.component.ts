import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { LeaveService } from "src/app/services/leave.service";
import Swal from "sweetalert2";
import { LookupsService } from "src/app/services/lookups.service";
import { Config } from "src/app/utility/config";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { EmployeeService } from "../hrm/employee.service";
import { SocialmediaService } from "../devtools/socialmedia.service";
import { EmployeeinfoService } from "../hrm/employee-info/employeeinfo.service";
import { DashboardService } from "./dashboard.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  title = "Dashboard";
  year: any;
  timeoffForm!: FormGroup;
  userInfo: any;
  User_Id: any;
  status: any;
  submitted: boolean;
  from_Date: any;
  to_Date: any;
  requested_Date: any;
  role_Id: any;
  amount: any;
  leaveAmt: any;
  Id: any;
  public _LeaveStatus: any;
  public _LeaveType: any;
  hideForUser: boolean = false;

  // WeekOff
  displayedColumns: string[] = ["fullName", "from", "to"];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  roleid: any;
  userType: number;
  ModalOpen: boolean = false;
  LeaveReq: any;
  IsActive: any = "true";
  EmployeeList: any;
  OnLeaveToday: any;
  ModalOpen2: boolean;
  full_Name: any;
  userObj: any;
  showSalary: boolean = false;
  DepartmentList: any;
  individualEmployeeReq: any;
  DepartmentName: any;
  RoleName: any;
  Leave_Info_Admin: any;
  gender: any;
  LeaveInfo_employee: any;
  LeaveInfo_employee_length: any;
  People_On_WeekOff: any;

  Value: string;

  constructor(
    private formBuilder: FormBuilder,
    private api: LeaveService,
    private activatedRoute: ActivatedRoute,
    private CommonApi: LookupsService,
    private config: Config,
    private empoloyeeApi: EmployeeService,
    private departmentApi: SocialmediaService,
    private employeeApiInfo: EmployeeinfoService,
    private dashApi: DashboardService
  ) {
    this.timeoffForm = this.formBuilder.group({
      id: 0,
      user_Id: 0,
      leave_Type: "AL",
      from_Date: "",
      to_Date: "",
      singal_Date: "",
      half_Date: "",
      requested_Date: "",
      amount: 0,
      status: "Pending",
      remark: "",
      attachments: "",
    });
    this.Id = this.activatedRoute.snapshot.paramMap.get("Id");
  }

  ngOnInit(): void {
    this.userObj = JSON.parse(localStorage.getItem("userObj"));
    this.User_Id = this.userObj.user_Id;
    this.userType = this.userObj.role_Id;
    this.full_Name = this.userObj.userInfo.full_Name;
    this.RoleName = this.userObj.userInfo.role_Name;
    this.gender = this.userObj.userInfo.gender;

    this.GetleaveList();
    this.GetStatusList();
    this.weekOff();
    this.AllowedLeaves();
    this.timeoffForm.patchValue({
      leave_Type: "annual_leave",
    });

    this.getAllLeaveReq();
    this.getEmployeeList();
    this.getAllDepartment();
    this.getindividualEmployeeReq(this.User_Id);
    this.getDeperamentName(this.User_Id);
    this.LeaveInfo(this.User_Id);
    this.getleaveStatisticsToday();
    this.getleaveStatisticsWeek();
  }

  IsSuperAdmin() {
    if (this.userType === 0 || this.userType === 1) {
      return true;
    } else {
      return false;
    }
  }

  IsManager() {
    if (this.userType === 9) {
      return true;
    } else {
      return false;
    }
  }
  IsManagerAndEmployee() {
    if (this.userType === 2 || this.userType === 9) {
      return true;
    } else {
      return false;
    }
  }
  IsManagerAndAdmin() {
    if (this.userType === 0 || this.userType === 9 || this.userType == 1) {
      return true;
    } else {
      return false;
    }
  }

  IsEmployee() {
    if (this.userType === 2) {
      return true;
    } else {
      return false;
    }
  }



  // Get Leave Type
  GetleaveList() {
    this.CommonApi.GetByType("_LeaveType").subscribe((res) => {
      this._LeaveType = res.lookupList;
    },
      (err) => { }
    );
  }

  Openmodel() {
    this.ModalOpen = true;
  }
  cancel() {
    this.ModalOpen = false;
    this.timeoffForm.reset();
  }

  // Get leave_Type
  GetStatusList() {
    this.CommonApi.GetByType("_LeaveStatus").subscribe((res) => {
      this._LeaveStatus = res.lookupList;
    },
      (err) => {
        // console.log("Error");
      }
    );
  }


  // Apply Filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //Export data

  // weekOff
  weekOff() {
    this.api.getByOff().subscribe((res) => {
      this.People_On_WeekOff = res.employee_Leave
      if (res.status == "1") {
        this.dataSource = new MatTableDataSource(res.employee_Leave);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      } else {
        Swal.fire("Oops..", res.message, "error");
      }
    });
  }

  // Allowed Leaves
  AllowedLeaves() {
    this.api.getLeavesAllowed().subscribe((res: any) => {
      if (res.status == "1") {
        this.dataSource = new MatTableDataSource(res.leaves);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      } else {
        Swal.fire("Oops..", res.message, "error");
      }
    });
  }

  //  All Leave Request
  getAllLeaveReq() {
    this.api.getAll().subscribe((res) => {
      this.LeaveReq = res.employeeleavelist.length;
    });
  }

  // All employee List
  getEmployeeList() {
    this.empoloyeeApi
      .getAllEmployeesListByIsActive(this.IsActive)
      .subscribe((res) => {
        this.EmployeeList = res.user.length;
      });
  }

  // All Department List
  getAllDepartment() {
    this.departmentApi.GetAllDepartment().subscribe((res) => {
      this.DepartmentList = res.depertmentlist.length;
    });
  }

  // Employee Leave req
  getindividualEmployeeReq(userid) {
    this.api.getByList(userid).subscribe((res) => {
      this.individualEmployeeReq = res.employeeleavelist.length;
    });
  }


  GetSalaryData() {
    this.showSalary = true;
  }

  // Get All Department
  getDeperamentName(User_Id) {
    this.employeeApiInfo.GetById(this.User_Id).subscribe((res) => {
      this.DepartmentName = res.employeeList;
    });
  }

  // Leave Statistics Month
  getleaveStatisticsToday() {
    this.config.startLoader();
    this.Value = "Today";
    this.dashApi.getleaveStatistics(this.Value).subscribe((res) => {
      this.Leave_Info_Admin = res.adminLeave;
      this.config.stopLoader();
    });
  }
  // Leave Statistics Week
  getleaveStatisticsWeek() {
    this.config.startLoader();
    this.Value = "Week";
    this.dashApi.getleaveStatistics(this.Value).subscribe((res) => {
      this.Leave_Info_Admin = res.adminLeave;
      this.config.stopLoader();
    });
  }
  // Leave Statistics Month
  getleaveStatisticsMonth() {
    this.config.startLoader();
    this.Value = "Month";
    this.dashApi.getleaveStatistics(this.Value).subscribe((res) => {
      this.Leave_Info_Admin = res.adminLeave;
      this.config.stopLoader();
    });
  }

  // Emp Leave Info
  LeaveInfo(User_Id) {
    this.config.startLoader();
    this.dashApi.getEmpLeaveInfo(this.User_Id).subscribe((res) => {
      this.LeaveInfo_employee = res.employeeLeave
      this.LeaveInfo_employee_length = res.employeeLeave.length
      this.config.stopLoader();
    });
  }
}
