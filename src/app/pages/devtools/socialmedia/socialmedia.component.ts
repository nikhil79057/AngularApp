import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Config } from "src/app/utility/config";
import Swal from "sweetalert2";
import { SocialmediaService } from "../socialmedia.service";
import { Toaster } from "ngx-toast-notifications";
import { DatePipe } from "@angular/common";
import * as moment from "moment";


@Component({
  selector: "app-socialmedia",
  templateUrl: "./socialmedia.component.html",
  styleUrls: ["./socialmedia.component.scss"],
})
export class SocialmediaComponent implements OnInit {
  // Table For Admin
  displayedColumns: string[] = [
    "name",
    "fromDate",
    "toDate",
    // "type",
    "remark",
    "action",
  ];

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // Table For Manager & Admin
  displayedColumns2: string[] = [
    "name",
    "fromDate",
    "toDate",
    // "type",
    "remark",
  ];

  dataSource2: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator2: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort2: MatSort;

  user_Id: number;
  submitted: boolean = false;
  isSubmitted: boolean = false;
  ModalOpen: boolean;
  SocialMedia: FormGroup;
  userInfo: any;
  User_Id: any;
  userType: any;
  dates: any;
  HoliDay_List: any;
  fromDate: string;
  toDate: string;

  constructor(
    private Api: SocialmediaService,
    private LookupFormBuilder: FormBuilder,
    private config: Config,
    private toaster: Toaster,
    private datePipe: DatePipe
  ) {
    this.SocialMedia = this.LookupFormBuilder.group({
      id: 0,
      name: "",
      fromDate: "",
      toDate: "",
      type: "",
      remark: "",
      created_By: "",
      dts: "",
      modified_By: "",
      modified_On: "",
    });
  }

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem("userObj"));
    this.User_Id = JSON.parse(localStorage.getItem("userObj")).userInfo.user_Id;
    this.userType = this.userInfo.role_Id;
    // console.log("roleid", this.userType);
    this.Getall();
    // this.yesterdayDateFilter();
  }



  IsSuperAdmin() {
    if (this.userType === 0 || this.userType === 1) {
      return true;
    } else {
      return false;
    }
  }

  IsManagerAndEmp() {
    if (this.userType === 9 || this.userType === 2) {
      return true;
    } else {
      return false;
    }
  }

  saveLink() {
    if (this.SocialMedia.value.id == null) {
      this.SocialMedia.value.id = 0;
    } else {
    }
    if (this.SocialMedia.value.user_Id == null) {
      this.SocialMedia.value.user_Id = 0;
    }
    this.SocialMedia.value.dts = "2020-12-23T11:36:09.105Z";
    this.SocialMedia.value.from_Date = this.SocialMedia.value.from_Date;
    this.SocialMedia.value.to_Date = this.SocialMedia.value.to_Date;
    this.SocialMedia.value.type = ""
    this.Api.SaveMedia(this.SocialMedia.value).subscribe((res) => {
      if (res.status == "1") {
        this.config.stopLoader();
        this.toaster.open({
          text: res.message,
          position: 'top-right',
          type: "success",
        });
        this.ModalOpen = false;
        this.Getall();
        this.SocialMedia.reset();
      } else {
        (err) => { };
      }
    });
  }

  Getall() {
    this.config.startLoader();
    this.Api.GetAll().subscribe((res) => {
      this.config.stopLoader();
      if (res.status == "1") {
        // Admin
        this.dataSource = new MatTableDataSource(res.socialMedia);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        // Manager And Employee
        this.dataSource2 = new MatTableDataSource(res.socialMedia);
        this.dataSource.sort = this.sort2;
        this.dataSource.paginator = this.paginator2;
      } else {
        Swal.fire("Oops..", res.message, "error");
      }
    });
  }

  getById(Id) {
    this.ModalOpen = true;
    this.Api.GetById(Id).subscribe(
      (res) => {
        this.dates = res.socialMedia;
        this.SocialMedia.patchValue({
          id: res.socialMedia.id,
          name: res.socialMedia.name,
          type: res.socialMedia.type,
          remark: res.socialMedia.remark,
          fromDate: res.socialMedia.fromDate,
          toDate: res.socialMedia.toDate
        });

      },
      (err) => {
        this.toaster.open({
          text: err,
          position: 'top-right',
          type: "danger",
        });
      }
    );
  }

  // yesterdayDateFilter() {
  //   let dates = new Date();
  //   dates.setDate(dates.getDate());
  //   console.log(dates);
  //   this.fromDate = this.datePipe.transform(dates, 'dd/MM/yyyy');
  //   this.toDate = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
  //   console.log(this.fromDate);
  //   console.log(this.toDate);
  // }

  delete(Id) {
    Swal.fire({
      title: "Are you sure want to delete?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.value) {
        this.Api.DeleteById(Id).subscribe((res) => {
          if (res.status == 1) {
            this.toaster.open({
              text: "Deleted Successfully!",
              position: 'top-right',
              type: "danger",
            });
            this.Getall();
          } else {
            Swal.fire("Unathorized", res.message, "error");
            this.Getall();
          }
        });
      }
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    this.dataSource2.filter = filterValue;
  }

  cancel() {
    this.submitted = false;
    this.ModalOpen = false;
    this.SocialMedia.reset();
  }
  addLookup() {
    this.ModalOpen = true;
  }
}
