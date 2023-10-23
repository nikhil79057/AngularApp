import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { EmployeeService } from "../employee/employee.service";
import { MatTableDataSource } from "@angular/material/table";
import Swal from "sweetalert2";
import { ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Router } from "@angular/router";
import { TimeBtxService } from "../../bentex/time-btx.service";
import { Config } from "src/app/utility/config";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.scss"],
})
export class EmployeeComponent implements OnInit {
  EmployeeForm: FormGroup;
  submitted: boolean;
  ModalOpen: boolean;
  user_Id: number;
  userType: any;
  compensationType: any;
  userDisabled: boolean;
  userInfo: any;
  IsActive: any = "true";
  dataSource: MatTableDataSource<any>;
  role_Id: any;
  ModalOpen2: any;
  roleid: any;
  EmpoloyeeList: any;
  EmpoloyeeListFiltered: any;
  manager: any;
  UserId: any;
  User_Id: any;
  managerUserId: any;
  managerId: any;
  UserValaue: any;
  userTypeVal: any;

  constructor(
    private router: Router,
    private empoloyeeApi: EmployeeService,
    private Api: TimeBtxService,
    private employeeFormBuilder: FormBuilder,
    private config: Config
  ) {
    this.EmployeeForm = this.employeeFormBuilder.group({
      company_Id: 0,
      user_Id: 0,
      managerId: 0,
      password: "",
      first_Name: "",
      last_Name: "",
      role_Id: 0,
      email: "",
      last_Login: "",
      failed_Login: null,
      failed_Attempt: null,
      is_Locked: false,
      is_Active: true,
      is_DailyStatusRequired: false,
      dts: "",
      salt: null,
      is_Deleted: false,
      created_On: "",
      modified_On: null,
      created_By: 0,
      profilePath: null,
      modified_By: 0,
      workingFor: "",
      isThirdPartyAdmin: false,
      app_Id: null,
      gender: "",
      mobile: "",
      mx: "",
    });
  }

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem("userObj"));
    this.User_Id = JSON.parse(localStorage.getItem("userObj")).userInfo.user_Id;
    this.roleid = this.userInfo.role_Id;

    if (this.roleid == 0 || this.roleid == 1) {
      this.getEmployeeListForAdmin();
    } else if (this.roleid == 9) {
      this.getEmployeeListFormanager();
    }
    this.GetUserTypeList();
    this.GetallManager();
  }

  IsSuperAdmin() {
    if (this.roleid === 0 || this.roleid === 1) {
      return true;
    } else {
      return false;
    }
  }

  IsManager() {
    if (this.roleid === 9 || this.roleid === 0 || this.roleid === 1) {
      return true;
    } else {
      return false;
    }
  }

  resetData() {
    this.IsActive = "true";
    this.getEmployeeListForAdmin();
  }

  // All employee List for Manager
  getEmployeeListFormanager() {
    this.config.startLoader();
    this.empoloyeeApi.GetmanagerEmployee(this.User_Id).subscribe((res) => {
      this.config.stopLoader();
      this.EmpoloyeeList = res.user;
      this.EmpoloyeeListFiltered = res.user;
    });
  }

  // All employee List for Admin
  getEmployeeListForAdmin() {
    this.config.startLoader();
    this.empoloyeeApi
      .getAllEmployeesListByIsActive(this.IsActive)
      .subscribe((res) => {
        this.config.stopLoader();
        this.EmpoloyeeList = res.user;
        this.EmpoloyeeListFiltered = res.user;
      });
  }

  loadEmployee(user_Id) {
    this.router.navigate(["/hrm/edit-employees/" + user_Id]);
  }

  GetallManager() {
    this.Api.GetManager().subscribe(
      (res) => {
        this.manager = res.user;
      },
      (err) => {}
    );
  }

  selectuserType(event) {
    this.userTypeVal = event.target.value;
  }

  selectEmployee(event) {
    this.managerUserId = event.target.value;
  }
  selectEmployeeId(event) {
    this.managerId = event.target.value;
    this.config.startLoader();
    this.empoloyeeApi.GetmanagerEmployee(this.managerId).subscribe((res) => {
      this.config.stopLoader();
      this.EmpoloyeeList = res.user;
      this.EmpoloyeeListFiltered = res.user;
    });
  }

  saveEmployee() {
    this.submitted = true;
    if (this.EmployeeForm.value.is_Deleted == null) {
      this.EmployeeForm.value.is_Deleted = false;
    }
    if (this.EmployeeForm.value.is_Locked == null) {
      this.EmployeeForm.value.is_Locked = false;
    }
    if (this.EmployeeForm.value.is_Active == null) {
      this.EmployeeForm.value.is_Active = false;
    }
    if (this.EmployeeForm.value.is_DailyStatusRequired == null) {
      this.EmployeeForm.value.is_DailyStatusRequired = false;
    }
    if (this.EmployeeForm.value.isThirdPartyAdmin == null) {
      this.EmployeeForm.value.isThirdPartyAdmin = false;
    }
    if (this.EmployeeForm.value.user_Id == null) {
      this.EmployeeForm.value.user_Id = 0;
    } else {
      this.EmployeeForm.value.user_Id = parseInt(
        this.EmployeeForm.value.user_Id
      );
    }
    if (this.EmployeeForm.value.company_Id == null) {
      this.EmployeeForm.value.company_Id = 0;
    }
    if (this.EmployeeForm.value.role_Id == null) {
      this.EmployeeForm.value.role_Id = 0;
    } else {
      this.EmployeeForm.value.role_Id = parseInt(
        this.EmployeeForm.value.role_Id
      );
    }

    if (this.EmployeeForm.value.created_By == null) {
      this.EmployeeForm.value.created_By = 0;
    }
    if (this.EmployeeForm.value.modified_By == null) {
      this.EmployeeForm.value.modified_By = 0;
    }
    if (this.EmployeeForm.value.failed_Attempt == null) {
      this.EmployeeForm.value.failed_Attempt = 0;
    }
    if (
      this.EmployeeForm.value.first_Name == "" ||
      this.EmployeeForm.value.first_Name == null ||
      this.EmployeeForm.value.first_Name == undefined
    ) {
      Swal.fire("Oops...", "Please Enter Name.", "error");
      return;
    } else if (
      this.EmployeeForm.value.password == "" ||
      this.EmployeeForm.value.password == null ||
      this.EmployeeForm.value.password == undefined ||
      this.EmployeeForm.value.password == 0
    ) {
      Swal.fire("Oops...", "Please Enter Password.", "error");
      return;
    } else if (
      this.EmployeeForm.value.email == "" ||
      this.EmployeeForm.value.email == null ||
      this.EmployeeForm.value.email == undefined ||
      this.EmployeeForm.value.password == 0
    ) {
      Swal.fire("Oops...", "Please Enter Email.", "error");
      return;
    } else if (
      this.EmployeeForm.value.role_Id == "" ||
      this.EmployeeForm.value.role_Id == null ||
      this.EmployeeForm.value.role_Id == undefined ||
      this.EmployeeForm.value.role_Id == 0
    ) {
      Swal.fire("Oops...", "Please Select User Type", "error");
      return;
    }
    if (this.userTypeVal != 1) {
      if (
        this.EmployeeForm.value.managerId == "" ||
        this.EmployeeForm.value.managerId == null ||
        this.EmployeeForm.value.managerId == undefined ||
        this.EmployeeForm.value.managerId == 0
      ) {
        Swal.fire("Oops...", "Please Select Manager", "error");
        return;
      }
    } else {
      this.EmployeeForm.value.managerId = this.managerUserId;
    }
    {
      this.submitted = false;
      this.EmployeeForm.value.managerId = parseInt(this.managerUserId);

      this.config.startLoader();
      this.empoloyeeApi
        .saveEmployees(this.EmployeeForm.value)
        .subscribe((res) => {
          this.config.stopLoader();
          if (res.status == 1) {
            this.ModalOpen = false;
            Swal.fire("Success", res.message, "success");
            if (this.roleid == 0 || this.roleid == 1) {
              this.getEmployeeListForAdmin();
            } else if (this.roleid == 9) {
              this.getEmployeeListFormanager();
            }
            this.EmployeeForm.reset();
          } else {
            Swal.fire("Oops..", res.message, "error");
          }
        });
    }
  }

  GetUserTypeList() {
    this.empoloyeeApi.GetByType("usertype").subscribe(
      (res) => {
        this.userType = res.lookupList;
      },
      (err) => {}
    );
  }

  EditRequestResponse(Id) {
    this.router.navigate(["/hrm/edit-employees/" + Id]);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    if (filterValue != "") {
      this.EmpoloyeeListFiltered = this.EmpoloyeeList.filter(function (tag) {
        return tag.full_Name.toLowerCase().indexOf(filterValue) >= 0;
      });
    } else {
      this.EmpoloyeeListFiltered = this.EmpoloyeeList;
    }
  }

  cancel() {
    this.submitted = false;
    this.EmployeeForm.reset();
    this.ModalOpen = false;
  }
  addUser(): void {
    // Set the value of the "mobile" input field to "+600"

    // Reset the user ID to 0
    this.user_Id = 0;

    // Set the "ModalOpen" variable to true
    this.ModalOpen = true;

    // Reset the entire form
    this.EmployeeForm.reset();
    this.EmployeeForm.patchValue({
      mx: "+60",
    });
  }

  delete(Id) {
    Swal.fire({
      title: "Are you sure want to delete?",
      //icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.value) {
        this.empoloyeeApi.deleteEmployee(Id).subscribe((res) => {
          if (res.status == 1) {
            Swal.fire("Success", "Deleted Successfully!", "success");
            this.getEmployeeListForAdmin();
          } else {
            Swal.fire("Unathorized", res.message, "error");
          }
        });
      }
    });
  }
}
