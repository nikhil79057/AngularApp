import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Config } from 'src/app/utility/config';

@Injectable({
  providedIn: 'root'
})
export class LmsReportsService {

  constructor(
    private config: Config,
    private http: HttpClient
  ) { }

  GetAllUsers(): Observable<any> {
    this.config.resolveLogin_KeyPromise()
    const url = this.config.APIUrl + "User/GetAll?Login_Key=" + this.config.login_Key + '&OnlyActive=' + true;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }

  GetReport(UserId, fromDate, toDate): Observable<any> {
    this.config.resolveLogin_KeyPromise()
    const url = this.config.APIUrl + "Reports/GetAlllowedLeaveByDate?Login_Key=" + this.config.login_Key + "&UserId=" + UserId + "&fromDate=" + fromDate + "&toDate=" + toDate
    return this.http
      .get(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
}
