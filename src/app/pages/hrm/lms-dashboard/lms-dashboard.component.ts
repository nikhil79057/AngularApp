import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators, } from "@angular/forms";
import { LeaveService } from "src/app/services/leave.service";
import Swal from "sweetalert2";
import { LookupsService } from "src/app/services/lookups.service";
import { Config } from "src/app/utility/config";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { EmployeeService } from "../employee/employee.service";


@Component({
  selector: "app-lms-dashboard",
  templateUrl: "./lms-dashboard.component.html",
  styleUrls: ["./lms-dashboard.component.scss"],
})
export class LMSDashboardComponent implements OnInit {
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

  // For Table
  displayedColumns: string[] = ["leave_Type", "amount", "isPaid", "remark"];

  displayedColumns2: string[] = ["fullName", "tillDate"];
  dataSource!: MatTableDataSource<any>;
  dataSource2!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  @ViewChild(MatPaginator, { static: false }) newpaginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) newsort: MatSort;
  endDate: any;
  OffToday: any;
  fullName: any;
  employee_Leave: any;
  roleid: any;
  userType: number;
  ModalOpen: boolean = false;
  Name: void;
  first_Name: any;
  greet: any;
  LeaveReq: any;
  IsActive: any = "true";
  EmployeeList: any;
  wishing: any;
  OnLeaveToday: any;
  iconColor: any;
  AllLeaveReq: any;
  ModalOpen2: boolean;


  constructor(
    private formBuilder: FormBuilder,
    private api: LeaveService,
    private activatedRoute: ActivatedRoute,
    private CommonApi: LookupsService,
    private config: Config,
    private empoloyeeApi: EmployeeService,

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
      attachments: ""
    });
    this.Id = this.activatedRoute.snapshot.paramMap.get("Id");
  }

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem("userObj"));
    this.User_Id = JSON.parse(localStorage.getItem("userObj")).userInfo.user_Id;
    this.userType = this.userInfo.role_Id;
    console.log("userType", this.userType);

    this.first_Name = JSON.parse(localStorage.getItem("userObj")).userInfo.first_Name;
    this.GetleaveList();
    this.GetStatusList();
    this.whoIsOff();
    this.AllowedLeaves();
    this.timeoffForm.patchValue({
      leave_Type: "annual_leave",
    })

    this.greeting();
    this.getAllLeaveReq();
    this.getEmployeeList();
  }

  // Greeting
  greeting() {
    const d = new Date();
    let hrs = d.getHours();
    let greet;
    let color;
    if (hrs < 12) {
      greet = "Good Morning";
      color = "text-warning";
    } else if (hrs >= 12 && hrs <= 16) {
      greet = "Good Afternoon";
      color = "text-warning";
    } else if (hrs >= 16 && hrs <= 24) {
      greet = "Good Evening";
      color = "text-dark";
    } else {
      greet = "Good Night"
    }
    this.greeting = greet;
    this.iconColor = color
  }

  IsSuperAdmin() {
    if (this.userType === 0 || this.userType === 1) {
      return true;
    } else {
      return false;
    }
  }

  IsManager() {
    if (this.userType === 9 ) {
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




  // Add Leave
  addLeave() {
    console.log(this.timeoffForm.value);
    if (
      this.timeoffForm.value.leave_Type == "" ||
      this.timeoffForm.value.status == " " ||
      this.timeoffForm.value.from_Date == "" ||
      this.timeoffForm.value.to_Date == null ||
      this.timeoffForm.value.remark == ""
    ) {
      Swal.fire("Oops...", "Please enter valid data", "error");
    } else {
      console.log(this.timeoffForm.value);
      this.submitted = true;
      if (this.timeoffForm.value.id == null) {
        this.timeoffForm.value.id = 0;
      }
      this.timeoffForm.value.user_Id = this.User_Id;
      this.timeoffForm.value.status = this.timeoffForm.value.status;
      this.timeoffForm.value.from_Date = this.timeoffForm.value.from_Date;
      this.timeoffForm.value.requested_Date = this.timeoffForm.value.from_Date;
      this.timeoffForm.value.amount = this.timeoffForm.value.amount;
      // this.timeoffForm.value.remark = this.timeoffForm.value.remark;
      this.api.postLeave(this.timeoffForm.value).subscribe((res) => {
        console.log("SaveLeave", res);
        if (res.status == "1") {
          Swal.fire("Success", res.message, "success");
          this.ModalOpen = false;
          this.timeoffForm.reset();
        } else {
          Swal.fire("Oops..", res.message, "error");
        }
      });
    }
  }


  // Get Leave Type
  GetleaveList() {
    this.CommonApi.GetByType("_LeaveType").subscribe(
      (res) => {
        this._LeaveType = res.lookupList;
      },
      (err) => {
        console.log("Error");
      }
    );
  }
  Openmodel() {
    this.ModalOpen = true;
  }
  cancel() {
    this.ModalOpen = false;
    this.timeoffForm.reset();
  }
  Announcements() {
    this.ModalOpen2 = true;
  }
  AnnouncementsCancel() {
    this.ModalOpen2 = false;
  }
  // Get leave_Type
  GetStatusList() {
    this.CommonApi.GetByType("_LeaveStatus").subscribe(
      (res) => {
        this._LeaveStatus = res.lookupList;
      },
      (err) => {
        console.log("Error");

      }
    );
  }

  // Calculate Date
  calculateAdavance() {
    // console.log("hello")
    let d1 = Date.parse(this.timeoffForm.value.to_Date);
    let d2 = Date.parse(this.timeoffForm.value.from_Date); //time in milliseconds
    var timeDiff = d1 - d2;
    var diff = timeDiff / (1000 * 3600 * 24);
    var day = Math.floor(diff) + 1;
    this.timeoffForm.patchValue({
      amount: day,
    });
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

  // Who is off
  whoIsOff() {
    this.api.getByOff().subscribe((res) => {
      console.log("whoIsOff", res)
      this.OnLeaveToday = res.employee_Leave.length;
      if (res.status == "1") {
        this.dataSource2 = new MatTableDataSource(res.employee_Leave);
        this.dataSource2.sort = this.newsort;
        this.dataSource2.paginator = this.newpaginator;
      } else {
        Swal.fire("Oops..", res.message, "error");
      }
    });
  }

  // Allowed Leaves
  AllowedLeaves() {
    this.api.getLeavesAllowed().subscribe((res: any) => {
      // console.log("AllowedLeave", res);
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
      console.log("LeaveReq", res);
      this.LeaveReq = res.employeeleavelist.length;
      // this.AllLeaveReq = res.employeeleavelist
    });
  }

  // All employee List
  getEmployeeList() {
    this.empoloyeeApi.getAllEmployeesListByIsActive(this.IsActive).subscribe((res) => {
      this.EmployeeList = res.user.length;
    })
  }

  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
  }
}
