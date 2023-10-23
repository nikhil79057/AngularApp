import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Config } from 'src/app/utility/config';

@Injectable({
  providedIn: 'root'
})
export class QRCodeService {

  constructor(private http: HttpClient, private config: Config) { }

  getQRCode(): Observable<any> {
    const url = this.config.APIUrl + "QRCode";
    return this.http .get(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }



}
