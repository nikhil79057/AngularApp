import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { Config } from "src/app/utility/config";

@Injectable({
  providedIn: "root",
})
export class EmployeeinfoService {
  constructor(private config: Config, private http: HttpClient) { }

  GetByType(type): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url =
      this.config.APIUrl + "Lookup/GetByLookupType?Lookup_Type=" + type;
    return this.http
      .get(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  SaveUpdate(data): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url =
      this.config.APIUrl +
      "Employee/SaveUpdate?Login_Key=" +
      this.config.login_Key;
    return this.http
      .post(url, data, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  GetById(Id): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url =
      this.config.APIUrl +
      "Employee/GetEmployeeById?Login_Key=" + this.config.login_Key + "&EmpId=" + Id;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  getBankList(Id): Observable<any> {
    const url =
      this.config.APIUrl +
      "Employee/GetAllBankInfoByUserId?Login_Key=" +
      this.config.login_Key +
      "&userId=" +
      Id;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  BankAddUpdate(data): Observable<any> {
    const url =
      this.config.APIUrl +
      "Employee/SaveUpdateBankInfo?Login_Key=" +
      this.config.login_Key;
    //console.log("URL " + url);
    return this.http
      .post(url, data, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  GetBankById(Id): Observable<any> {
    const url =
      this.config.APIUrl +
      "Employee/BankInfoGetById/" +
      Id +
      "?Login_Key=" +
      this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  DeleteBank(Id): Observable<any> {
    const url =
      this.config.APIUrl +
      "Employee/deleteBankInfo/" +
      Id +
      "?Login_Key=" +
      this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }

  // Leave Info
  SaveLeaveInfo(data): Observable<any> {
    const url = this.config.APIUrl + "Leave_Info/SaveUpdate?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, data, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }

  GetAllLeaveInfo(Id): Observable<any> {
    const url =
      this.config.APIUrl +
      "Leave_Info/GetAll?Login_Key=" +
      this.config.login_Key +
      "&User_Id=" +
      Id;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }


  GetLeaveInfo(Id): Observable<any> {
    const url =
      this.config.APIUrl +
      "Leave_Info/GetById?Id=" +
      Id +
      "&Login_Key=" +
      this.config.login_Key;
    return this.http
      .get(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }

  DeleteLeaveInfo(Id): Observable<any> {
    const url = this.config.APIUrl + "Leave_Info/DeleteLeave_Info?id=" + Id + "&Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
}
