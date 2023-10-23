import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Config } from "src/app/utility/config";
import Swal from "sweetalert2";
import { SocialmediaService } from "../../devtools/socialmedia.service";
import { EmployeeinfoService } from "./employeeinfo.service";

@Component({
  selector: "app-employee-info",
  templateUrl: "./employee-info.component.html",
  styleUrls: ["./employee-info.component.scss"],
})
export class EmployeeInfoComponent implements OnInit {
  @Input() user_Id: any;
  EditForm: FormGroup;
  dataSource: any;
  submitted: boolean;
  employee: any;
  employeeType: any;
  department: any;
  userInfo: any;
  roleid: any;

  constructor(
    private router: Router,
    private employeeApi: EmployeeinfoService,
    private Api: SocialmediaService,
    private Route: ActivatedRoute,
    private employeeFormBuilder: FormBuilder,
    private config: Config
  ) {
    this.EditForm = this.employeeFormBuilder.group({
      user_Id: 0,
      designation: "",
      date_Of_Joining: "2020-11-25T08:35:51.129Z",
      department: "",
      employment_Type: "",
      emp_Code: "",
      dob: "2020-11-25T08:35:51.129Z",
      location: "",
      contact_Id: 0,
    });
  }
  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem("userObj"));
    this.roleid = this.userInfo.role_Id;
    this.GetUserTypeList();
    this.getDetail();
    this.getAllDepartment();
  }

  GetUserTypeList() {
    this.employeeApi.GetByType("employeeType").subscribe(
      (res) => {
        this.employeeType = res.lookupList;
        //console.log("user type list", this.employeeType);
      },
      (err) => {
        //console.log("Errror", err);
      }
    );
  }

  getAllDepartment() {
    this.Api.GetAllDepartment().subscribe((res) => {
      // console.log("Emp Info", res);
      if (res.status == "1") {
        this.department = res.depertmentlist;
        // console.log("vivk", this.department)
      } else {
        Swal.fire("Oops..", res.message, "error");
      }
    });
  }

  getDetail() {
    //console.log("uyuygygu",this.user_Id)
    this.employeeApi.GetById(this.user_Id).subscribe(
      (res) => {
        this.employee = res.employeeList;
        console.log("employee info data ", this.employee);
        this.EditForm.patchValue({
          user_Id: this.user_Id,
          designation: res.employeeList.designation,
          //date_Of_Joining: res.employeeList.date_Of_Joining,
          date_Of_Joining: new Date(res.employeeList.date_Of_Joining)
            .toISOString()
            .split("T")[0],
          department: res.employeeList.department,
          employment_Type: res.employeeList.employment_Type,
          emp_Code: res.employeeList.emp_Code,
          //dob: res.employeeList.dob,
          dob: new Date(res.employeeList.dob).toISOString().split("T")[0],
          location: res.employeeList.location,
        });
      },
      (err) => {
        throw new Error(err);
        //console.log("errrrr", err);
      }
    );
  }

  get f() {
    return this.EditForm.controls;
  }

  saveEmployee() {
    if (this.EditForm.value.emp_Code == null) {
      this.EditForm.value.emp_Code = 0;
      return;
    }
    if (this.EditForm.value.contact_Id == null) {
      this.EditForm.value.contact_Id = 0;
      return;
    }
    if (this.EditForm.value.designation == null) {
      this.EditForm.value.designation = 0;
      return;
    }
    if (this.EditForm.value.department == "") {
      Swal.fire("Oops...", "Please choose department.", "error");
      return;
    }
    this.EditForm.value.date_Of_Joining = this.EditForm.value.date_Of_Joining;
    this.EditForm.value.employeeType = this.EditForm.value.employeeType;
    this.EditForm.value.dob = this.EditForm.value.dob;
    this.EditForm.value.user_Id = parseInt(this.user_Id);
    this.employeeApi.SaveUpdate(this.EditForm.value).subscribe((res) => {
      if (res.status == 1) {
        // console.log("successss", res);
        Swal.fire("Success", res.message, "success");
      } else {
        (err) => {
          //console.log("Errror", err);
        };
      }
    });
  }
}
