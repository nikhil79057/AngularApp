import { Component, OnInit } from "@angular/core";
//import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { LoginService } from "./login.service";
import Swal from "sweetalert2";
import { Config } from "src/app/utility/config";
import { AuthGuard } from "src/app/utility/auth.gaurds";
import { DashboardService } from "../../dashboard/dashboard.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  message: string;
  name: string;
  password: string;
  LoginMessage: string;
  loginForm: FormGroup;
  menuMasters: any;
  mainmenu: any = [];
  month: string;
  date: number;
  year: number;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private api: LoginService,
    private config: Config,
    private auth: AuthGuard,
    private dashboardApi: DashboardService
  ) {
    this.loginForm = this.fb.group({
      email: [""],
      password: [""],
    });
  }

  ngOnInit() {
    localStorage.removeItem("userObj");
    this.LoginMessage = localStorage.getItem("LoginMessage");
    localStorage.setItem("LoginMessage", "");

    this.getMonth();
  }
  handleError(error: any): void {
    let errorObj = {
      exception: JSON.stringify(error),
      location: "reportIncidentsPage",
      severity: "low",
      deviceType: "Admin",
    };
    this.dashboardApi.exceptionLog(errorObj);
  }
  signin() {
    // this.router.navigateByUrl("/dashboard");
    // return;
    if (
      this.loginForm.value.email == "" ||
      this.loginForm.value.email == null ||
      this.loginForm.value.email == undefined
    ) {
      Swal.fire("Oops...", "Please enter email", "error");
    } else if (
      this.loginForm.value.password == "" ||
      this.loginForm.value.password == null ||
      this.loginForm.value.password == undefined
    ) {
      Swal.fire("Oops...", "Please enter Password", "error");
    } else {
      this.config.startLoader();
      this.api.login(this.loginForm.value).subscribe((res) => {
        // console.log("login", res);

        this.config.stopLoader();
        if (res.status == 1) {
          localStorage.setItem("userObj", JSON.stringify(res));
          this.config.updateGlobalKey(res.key);
          //console.log('loginkey-'+ this.config.login_Key);
          this.auth.updateAuth(true);
          if (
            res.userInfo.workingFor &&
            res.userInfo.workingFor !== null &&
            res.userInfo.workingFor != ""
          ) {
            this.router.navigateByUrl("/dashboard" + res.userInfo.workingFor);
          } else {
            this.router.navigateByUrl("/dashboard");
          }
        } else {
          //console.log("login error");
          Swal.fire("Oops...", res.message, "error");
        }
      });
    }
  }

  // Get Year
  getMonth() {
    // const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const d = new Date();
    // let day = d.getDate();
    // let name = month[d.getMonth()];
    let year = d.getFullYear();
    // this.month = name;
    // this.date = day;
    this.year = year;
  }
}
