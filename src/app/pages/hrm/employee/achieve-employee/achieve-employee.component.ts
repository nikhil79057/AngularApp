import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from "../employee.service"
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Config } from "src/app/utility/config";
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";


@Component({
  selector: 'app-achieve-employee',
  templateUrl: './achieve-employee.component.html',
  styleUrls: ['./achieve-employee.component.scss']
})
export class AchieveEmployeeComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['full_Name', 'email', 'lookupName', 'action']
  EmployeeForm: FormGroup;
  submitted: boolean;
  ModalOpen: boolean;
  user_Id: number;
  userType: any;
  compensationType: any;
  userDisabled: boolean;
  userInfo: any;
  IsActive: any = "true";
  dataSource: MatTableDataSource<unknown>;
  role_Id: any;
  ModalOpen2: any;
  ArchiveEmployee: any;



  constructor(private router: Router, private empoloyeeApi: EmployeeService, private employeeFormBuilder: FormBuilder, private config: Config, private toaster: Toaster) {
    this.EmployeeForm = this.employeeFormBuilder.group({
      company_Id: 0,
      user_Id: 0,
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
      app_Id: null
    });
  }



  ngOnInit() {
    this.getEmployeeList();
  }


  resetData() {
    this.IsActive = "true";
    this.getEmployeeList();
  }

  // All Archive Employee List
  getEmployeeList() {
    this.config.startLoader();
    this.empoloyeeApi.ArchiveEmployee().subscribe(
      res => {
        this.config.stopLoader();
        this.ArchiveEmployee = res.user
        this.dataSource = new MatTableDataSource(res.user);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      err => {

      }
    );
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
        this.empoloyeeApi.delete(Id).subscribe((res) => {
          // console.log("deleteEmployee", res);
          if (res.status == 1) {
            Swal.fire("Success", "Deleted Successfully!", "success");
            this.getEmployeeList();
          } else {
            Swal.fire("Unathorized", res.message, "error");
          }
        });
      }
    });
  }
  loadEmployee(user_Id) {
    this.router.navigate(["/hrm/edit-employees/" + this.user_Id]);
  }

  RestoreEmployee(user_Id) {
    console.log("user_Id", user_Id);
    Swal.fire({
      title: "Are you sure want to Restore?",
      //icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.value) {
        this.config.startLoader();
        this.empoloyeeApi.RestoreEmployee(user_Id).subscribe((res) => {
          this.config.stopLoader();
          this.toaster.open({
            text: "Employee Restore Successfully",
            position: 'top-right',
            type: "success",
          });
          this.getEmployeeList();
        })
      }
    });
  }




  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  cancel() {
    this.submitted = false;
    this.EmployeeForm.reset();
    this.ModalOpen = false;
  }
  addUser() {
    this.user_Id = 0;
    this.ModalOpen = true;
    this.EmployeeForm.reset();
  }

 

  archive_employee() {
    this.ModalOpen2 = true;
  }
  ModalClose() {
    this.ModalOpen2 = false;
  }


}
