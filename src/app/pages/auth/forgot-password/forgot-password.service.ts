import { Injectable } from "@angular/core";

import { Observable, of, throwError } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { catchError, tap, map } from "rxjs/operators";

import { BehaviorSubject } from "rxjs";
import { Config } from "src/app/utility/config";



@Injectable({
  providedIn: "root"
})
export class ForgotPasswordService {
  constructor(private http: HttpClient, private config: Config) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("An error occurred:", error.error.message);
    } else {
      console.error(
        "Backend returned code ${error.status}, " + "body was: ${error.error}"
      );
    }
    return throwError("Something bad happened; please try again later.");
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  forgotPwd(data): Observable<any> {
    let postData = {
      email: data
    };
    const url = this.config.APIUrl + "Account/ForgotPassword";

    return this.http
      .post(url, postData, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }
  resetPassword(data): Observable<any> {
    const url =
      this.config.APIUrl + "Account/AdminResetPasswordMagicLink";
    //console.log("from service,", data);
    return this.http
      .post(url, data, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }
}
