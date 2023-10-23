import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ForgotPasswordService } from '../forgot-password/forgot-password.service';
import { Config } from 'src/app/utility/config';
import { ResetPasswordService } from '../../accounts/reset-password/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  userObj: any;
  showModal: boolean;
  message: any;
  user_Id: any;
  loginForm: FormGroup;
  code: any;
  year: number;
  email: string;

  constructor(private router: Router,
    private api: ResetPasswordService,
    private config: Config,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {

    this.code = this.route.snapshot.queryParamMap.get("code");
    this.loginForm = this.fb.group({
      password: [""],
      confirmPassword: [""],
      userId: [""],
      email: [""],
      old_Password: [""]

    });

  }

  ngOnInit() {
    this.userObj = JSON.parse(localStorage.getItem("userObj"));
    this.user_Id = this.userObj.userInfo.user_Id;
    this.email = this.userObj.userInfo.email;
    this.getMonth();
  }

  resetPwd() {
    const password = this.loginForm.value.password;

    // Check if the password meets the requirements
    const hasValidPassword = /^[a-zA-Z0-9]{8,}$/.test(password);
    if (!hasValidPassword) {
      Swal.fire("Oops...", "Password must be at least 8 characters long and contain only letters and numbers!", "error");
      return;
    }

    // Check if the password and confirm password match
    if (password !== this.loginForm.value.confirmPassword) {
      Swal.fire("Oops...", "Confirm Password not matched!", "error");
      return;
    }

    this.config.startLoader();
    this.loginForm.value.userId = this.user_Id;
    this.loginForm.value.email = this.email;
    console.log("login form ", this.loginForm.value)
    this.api.resetPassword(this.loginForm.value).subscribe(res => {
      if (res.status == 1) {
        //this.showModal = true;
        this.message = res.message;
        //console.log("res==> "+res);
        Swal.fire("Success", res.message, "success");
        this.config.stopLoader();
        this.router.navigateByUrl("/login");
      } else {
        this.config.stopLoader();
        Swal.fire("Oops...", res.message, "error");
      }
    });
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
