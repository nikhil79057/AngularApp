import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ForgotPasswordService } from "./forgot-password.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"]
})
export class ForgotPasswordComponent implements OnInit {
  forgotPwdFrm: FormGroup;
  year: number;

  constructor(private fb: FormBuilder, private api: ForgotPasswordService) {
    this.forgotPwdFrm = this.fb.group({
      email: [""]
    });
  }

  ngOnInit() { }
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
  forgotPwd() {
    //console.log("forgot pwd", this.forgotPwdFrm.value);
    if (this.forgotPwdFrm.value.email == "" || this.forgotPwdFrm.value.email == null || this.forgotPwdFrm.value.email == undefined) {
      Swal.fire("Oops...", "Please enter Email Address", "error")
    }
    if (this.forgotPwdFrm.value.email.length > 3) {
      this.api
        .forgotPwd(this.forgotPwdFrm.value.email)
        .subscribe(res => {
          if (res.status == 1) {
            Swal.fire("Success", res.message, "success");
          } else {
            //console.log("something went worng");
            Swal.fire("Oops...", res.message, "error");
          }
        });
    }
  }
}
