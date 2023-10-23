import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { Toaster } from "ngx-toast-notifications";
import { LookupsService } from "src/app/services/lookups.service";
import { Config } from "src/app/utility/config";
import Swal from "sweetalert2";

@Component({
  selector: "app-week-day-setup",
  templateUrl: "./week-day-setup.component.html",
  styleUrls: ["./week-day-setup.component.scss"],
})
export class WeekDaySetupComponent implements OnInit {
  displayedColumns: string[] = [
    "weekType",

    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
    "Actions",
  ];

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @Input() user_Id: any;
  WeekDay: any;
  EditForm: FormGroup;
  userInfo: any;
  roleid: any;
  weektyupe: any;
  weekdaylist: any;
  constructor(
    private LookUpApi: LookupsService,
    private Route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private config: Config,
    private toaster: Toaster
  ) {
    this.EditForm = this.formBuilder.group({
      id: 0,
      user_Id: 0,
      weekType: 0,
      sunday: 0,
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      saturday: 0,
    });
  }

  ngOnInit() {
    this.user_Id = this.Route.snapshot.paramMap.get("Id");
    this.userInfo = JSON.parse(localStorage.getItem("userObj"));
    this.roleid = this.userInfo.role_Id;
    this.GetStatusList();
    this.GetAll(this.user_Id);
  }
  GetStatusList() {
    this.LookUpApi.GetByType("WeekDay").subscribe(
      (res) => {
        this.WeekDay = res.lookupList;
      },
      (err) => {
        // console.log("Error");
      }
    );
  }
  // Get Leave Info
  GetAll(user_Id) {
    this.LookUpApi.GetAll(user_Id).subscribe((res) => {
      this.weekdaylist = res.weekDaylist;
      if (res.status == "1") {
        this.dataSource = new MatTableDataSource(res.weekDaylist);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      } else {
        Swal.fire("Oops..", res.message, "error");
      }
    });
  }

  selectStatus(val) {
    this.weektyupe = val;
    console.log("hay", this.weektyupe);
  }

  saveUpdate() {
    console.log("test1:", this.EditForm.value);

    // Convert user_Id and weekType values to integers
    this.EditForm.value.user_Id = parseInt(this.user_Id);
    this.EditForm.value.weekType = parseInt(this.weektyupe);

    // Check for null values and set them to 0
    if (this.EditForm.value.id == null) {
      this.EditForm.value.id = 0;
    }
    if (this.EditForm.value.sunday == null) {
      this.EditForm.value.sunday = 0;
    }
    if (this.EditForm.value.saturday == null) {
      this.EditForm.value.saturday = 0;
    }

    console.log("tets3", this.EditForm.value);
    this.config.startLoader();
    this.LookUpApi.Saveupdate(this.EditForm.value).subscribe((res) => {
      if (res.status == "1") {
        this.config.stopLoader();
        this.EditForm.reset();
        this.GetAll(this.user_Id);
        this.toaster.open({
          text: res.message,
          position: "top-right",
          type: "success",
        });
      } else {
        this.toaster.open({
          text: res.message,
          position: "top-right",
          type: "danger",
        });
      }
    });
  }
  // Edit
  EditLeaveInfo(id) {}
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
        this.LookUpApi.Delete(id).subscribe((res) => {
          if (res.status == 1) {
            this.toaster.open({
              text: "Deleted Successfully!",
              position: "top-right",
              type: "success",
            });

            this.GetAll(this.user_Id);
            this.config.stopLoader();
          } else {
            this.toaster.open({
              text: res.message,
              position: "top-right",
              type: "danger",
            });
          }
        });
      }
    });
  }
}
