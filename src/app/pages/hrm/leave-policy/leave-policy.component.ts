import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { LookupsService } from "src/app/services/lookups.service";
import { EmployeeinfoService } from "../employee-info/employeeinfo.service";
import Swal from "sweetalert2";
import { Router, ActivatedRoute } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Config } from "src/app/utility/config";
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";



@Component({
  selector: "app-leave-policy",
  templateUrl: "./leave-policy.component.html",
  styleUrls: ["./leave-policy.component.scss"],
})
export class LeavePolicyComponent implements OnInit {
  // For Table
  displayedColumns: string[] = [
    "leave_Type",
    "valid-from",
    "valid-to",
    "amount",
    "Actions",
  ];

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @Input() user_Id: any;
  _LeaveType: any;
  EditForm: any;
  LeaveInfList: any;
  id: any;
  dates: any;
  userInfo: any;
  roleid: any;
  constructor(
    private LookUpApi: LookupsService,
    private formBuilder: FormBuilder,
    private employeeApi: EmployeeinfoService,
    private Route: ActivatedRoute,
    private config: Config,
    private toaster: Toaster

  ) {
    this.EditForm = this.formBuilder.group({
      id: 0,
      user_Id: 0,
      leave_Type: "",
      fromDate: "",
      todate: "",
      amount: 0,
      valid_UpTo: "",
    });
  }

  ngOnInit() {
    this.user_Id = this.Route.snapshot.paramMap.get("Id");
    this.userInfo = JSON.parse(localStorage.getItem("userObj"));
    this.roleid = this.userInfo.role_Id;
    this.GetleaveType();
    this.GetAllLeaveInfo(this.user_Id);
  }

  IsSuperAdmin() {
    if (this.roleid === 0 || this.roleid === 1) {
      return true;
    } else {
      return false;
    }
  }

  // Leave Type
  GetleaveType() {
    this.LookUpApi.GetByType("_LeaveType").subscribe(
      (res) => {
        this._LeaveType = res.lookupList;
      },
      (err) => {
        // console.log("Something went wrong");
      }
    );
  }

  get f() {
    return this.EditForm.controls;
  }

  saveLeave() {
    if (this.EditForm.value.id == null) {
      this.EditForm.value.id = 0;
    }
    else if (this.EditForm.value.leave_Type == "" || this.EditForm.value.leave_Type == null) {
      this.toaster.open({
        text: "Please enter Leave type",
        position: 'top-right',
        type: "danger",
      });
    } else if (this.EditForm.value.fromDate == "" || this.EditForm.value.fromDate == null) {
      this.toaster.open({
        text: "Please enter From date",
        position: 'top-right',
        type: "danger",
      });
    } else if (this.EditForm.value.todate == "" || this.EditForm.value.todate == null) {
      this.toaster.open({
        text: "Please enter To date",
        position: 'top-right',
        type: "danger",
      });
    }
    else if (this.EditForm.value.leave_Type == "Emergency_Leave") {
      this.toaster.open({
        text: "Emergency  Leave is not assign beacuse this leave is deduct from annual leave ",
        position: 'top-right',
        type: "danger",
      });
    }
    else if (this.EditForm.value.amount == "" || this.EditForm.value.amount == null || this.EditForm.value.amount == 0) {
      this.toaster.open({
        text: "Please enter Allowed Leave",
        position: 'top-right',
        type: "danger",
      });

    }
    else {
      this.config.startLoader();
      this.EditForm.value.user_Id = parseInt(this.user_Id);
      this.EditForm.value.leave_Type = this.EditForm.value.leave_Type;
      this.EditForm.value.fromDate = this.EditForm.value.fromDate;
      this.EditForm.value.todate = this.EditForm.value.todate;
      this.EditForm.value.amount = this.EditForm.value.amount;
      this.EditForm.value.valid_UpTo = this.EditForm.value.todate;
      this.employeeApi.SaveLeaveInfo(this.EditForm.value).subscribe((res) => {
        this.config.stopLoader();
        if (res.status == "1") {
          this.EditForm.reset();
          this.GetAllLeaveInfo(this.user_Id);
          this.toaster.open({
            text: res.message,
            position: 'top-right',
            type: "success",
          });
        } else {
          this.toaster.open({
            text: res.message,
            position: 'top-right',
            type: "danger",
          });
        }
      });
    }
  }

  // Get Leave Info
  GetAllLeaveInfo(user_Id) {
    this.employeeApi.GetAllLeaveInfo(user_Id).subscribe((res) => {
      this.LeaveInfList = res.leave_InfoList;
      if (res.status == "1") {
        this.dataSource = new MatTableDataSource(res.leave_InfoList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      } else {
        Swal.fire("Oops..", res.message, "error");
      }
    });
  }

  // Edit
  EditLeaveInfo(id) {
    this.employeeApi.GetLeaveInfo(id).subscribe((res) => {
      // console.log("edit", res);
      this.dates = res.leave_Info;
      this.EditForm.patchValue({
        id: res.leave_Info.id,
        user_Id: res.leave_Info.user_Id,
        leave_Type: res.leave_Info.leave_Type,
        fromDate: res.leave_Info.fromDate,
        todate: res.leave_Info.todate,
        amount: res.leave_Info.amount,
        valid_UpTo: res.leave_Info.valid_UpTo,
      });
    });
  }

  // Delete
  DeleteLeaveInfo(id) {
    Swal.fire({
      title: "Are you sure want to delete?",
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.value) {
        this.config.startLoader();
        this.employeeApi.DeleteLeaveInfo(id).subscribe((res) => {
          if (res.status == 1) {
            this.toaster.open({
              text: "Deleted Successfully!",
              position: 'top-right',
              type: "success",
            });

            this.GetAllLeaveInfo(this.user_Id);
            this.config.stopLoader();
          } else {
            this.toaster.open({
              text: res.message,
              position: 'top-right',
              type: "danger",
            });
          }
        });
      }
    });
  }
}
