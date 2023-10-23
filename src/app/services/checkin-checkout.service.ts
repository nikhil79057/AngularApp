import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Config } from 'src/app/utility/config';
@Injectable({
  providedIn: 'root'
})
export class CheckinCheckoutService {
  checkOut(result: string) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient, private config: Config) { }
  
  // checkIn(data: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/checkin`, data);
  // }

  checkIn(data): Observable<any> {
    const url = this.config.APIUrl + "QRT_Attendance/SaveUpdateQRT?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, data, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }

}
