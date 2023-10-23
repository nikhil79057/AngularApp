import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { SocialmediaService } from "../socialmedia.service";
import Swal from "sweetalert2";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { TimeBtxService } from "../../bentex/time-btx.service";
import { Config } from "src/app/utility/config";
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";

@Component({
  selector: "app-department",
  templateUrl: "./department.component.html",
  styleUrls: ["./department.component.scss"],
})
export class DepartmentComponent implements OnInit {
  // Table For Admin
  displayedColumns: string[] = [
    "Name",
    "Manager",
    "Description",
    "Created",
    "Actions",
  ];
  // Table For Admin
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  // Table For Manager Employee
  displayedColumns2: string[] = ["Name", "Manager", "Description", "Created"];
  dataSource2: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator2: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort2: MatSort;

  userInfo: any;
  User_Id: any;
  userType: any;
  ModalOpen: boolean;
  departmentForm: any;
  dates: any;
  manager: any;

  constructor(
    private formBuilder: FormBuilder,
    private Api: SocialmediaService,
    private api: TimeBtxService,
    private config: Config,
    private toaster: Toaster
  ) {
    this.departmentForm = this.formBuilder.group({
      id: 0,
      user_Id: 0,
      name: "",
      description: "",
      dts: "2022-12-10T07:23:55.912Z",
    });
  }

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem("userObj"));
    this.User_Id = JSON.parse(localStorage.getItem("userObj")).userInfo.user_Id;
    this.userType = this.userInfo.role_Id;
    this.GetallManager();
    this.getAllDepartment();
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

  addDepartments() {
    this.ModalOpen = true;
  }

  SaveDepartments() {
    // console.log(this.departmentForm.value);
    if (
      this.departmentForm.value.name == "" ||
      this.departmentForm.value.parent_Department == " " ||
      this.departmentForm.value.location == ""
    ) {
      Swal.fire("Oops...", "Please enter valid data", "error");
    } else {
      if (this.departmentForm.value.id == null) {
        this.departmentForm.value.id = 0;
      }
      this.departmentForm.value.user_Id = parseInt(
        this.departmentForm.value.user_Id
      );
      this.Api.SaveDepartment(this.departmentForm.value).subscribe((res) => {
        if (res.status == "1") {
          this.toaster.open({
            text: res.message,
            position: "top-right",
            type: "success",
          });
          this.ModalOpen = false;
          this.getAllDepartment();
          this.departmentForm.reset();
        } else {
          Swal.fire("Oops..", res.message, "error");
        }
      });
    }
  }

  // GetAll Data
  getAllDepartment() {
    this.config.startLoader();
    this.Api.GetAllDepartment().subscribe((res) => {
      this.config.stopLoader();
      if (res.status == "1") {
        this.dataSource = new MatTableDataSource(res.depertmentlist);
        this.dataSource2 = new MatTableDataSource(res.depertmentlist);
        // console.log("vivk", this.dataSource)
        this.dataSource.sort = this.sort;
        this.dataSource.sort = this.sort2;
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator = this.paginator2;
      } else {
        Swal.fire("Oops..", res.message, "error");
      }
    });
  }

  // Edit
  getById(Id) {
    this.ModalOpen = true;
    this.Api.GetDepertmentById(Id).subscribe((res) => {
      this.dates = res.department;
      this.departmentForm.patchValue({
        id: res.department.id,
        user_Id: res.department.user_Id,
        name: res.department.name,
        description: res.department.description,
        dts: res.department.dts,
      });
    });
  }

  GetallManager() {
    this.api.GetManager().subscribe(
      (res) => {
        this.manager = res.user;
        // console.log("manager", this.manager);
      },
      (err) => {
        //console.log("Errror", err);
      }
    );
  }

  delete(Id) {
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
        this.Api.DeleteDepartmentById(Id).subscribe((res) => {
          if (res.status == 1) {
            this.toaster.open({
              text: "Deleted Successfully!",
              position: "top-right",
              type: "danger",
            });
            this.getAllDepartment();
          } else {
            Swal.fire("Unathorized", res.message, "error");
            this.getAllDepartment();
          }
        });
      }
    });
  }
  cancel() {
    this.ModalOpen = false;
    this.departmentForm.reset();
    this.departmentForm.patchValue({
      User_Id: 0,
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    this.dataSource2.filter = filterValue;
  }
}
