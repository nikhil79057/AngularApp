import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Config } from "../utility/config";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class LeaveService {
  constructor(private http: HttpClient, private config: Config) { }

  postLeave(data: any): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url =
      this.config.APIUrl +
      "Leave/SaveUpdate?Login_Key=" +
      this.config.login_Key;
    return this.http
      .post(url, data, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  getByEntity(EntityId): Observable<any> {
    const url = this.config.APIUrl + "Attachment/GetAttachmentByEntity?Login_Key=" + this.config.login_Key + "&entityId=" + EntityId;
    return this.http.get(url, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }
  getByList(UserId): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url =
      this.config.APIUrl +
      "Leave/GetALlLeavesByEmployee?Login_Key=" +
      this.config.login_Key +
      "&UserId=" +
      UserId;
    return this.http
      .get(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }

  // bystatus
  getByListbystatus(val): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url =
      this.config.APIUrl +
      "Leave/GetALlLeavestatus?Login_Key=" +
      this.config.login_Key +
      "&Status=" +
      val;
    return this.http
      .get(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }

  getBymanager(UserId): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url =
      this.config.APIUrl +
      "Leave/GetALlLeavesBymanager?Login_Key=" +
      this.config.login_Key +
      "&UserId=" +
      UserId;
    return this.http
      .get(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  getmanagerLeave(UserId): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url =
      this.config.APIUrl +
      "Leave/GetALlLeavesmanager?Login_Key=" +
      this.config.login_Key +
      "&UserId=" +
      UserId;
    return this.http
      .get(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  getAll(): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url =
      this.config.APIUrl +
      "Leave/GetALlLeavesByall?Login_Key=" +
      this.config.login_Key;
    return this.http
      .get(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }

  getByOff(): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url =
      this.config.APIUrl +
      "Leave/GetWhoIsOff?Login_Key=" +
      this.config.login_Key;
    return this.http
      .get(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }

  getLeavesAllowed() {
    this.config.resolveLogin_KeyPromise();
    const url =
      this.config.APIUrl +
      "Leave/GetAllLeavesAllowed?Login_Key=" +
      this.config.login_Key;
    return this.http
      .get(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }

  editLeave(Id): Observable<any> {
    const url =
      this.config.APIUrl +
      "Leave/GetById?Id=" +
      Id +
      "&Login_Key=" +
      this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  DeleteById(Id): Observable<any> {
    const url =
      this.config.APIUrl +
      "Leave/DeleteSocialMedia?id=" +
      Id +
      "&Login_Key=" +
      this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }

  // Approved
  ApprovedLeave(Id): Observable<any> {
    const url =
      this.config.APIUrl +
      "Leave/ApprovedLeave?Id=" +
      Id +
      "&Login_Key=" +
      this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }

  // Reject
  RejectLeave(Id): Observable<any> {
    const url =
      this.config.APIUrl +
      "Leave/RejectLeave?Id=" +
      Id +
      "&Login_Key=" +
      this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }

  postFile(fileToUpload: File): Observable<any> {
    const url = this.config.APIUrl + "Attachment/UploadPhysical?FileName=" + fileToUpload.name;
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http.post(url, formData).pipe(catchError(this.config.handleError));
  }

  // Delete Attachment
  DeleteAttachment(attachmentId): Observable<any> {
    const url = this.config.APIUrl + "Attachment/DeleteById?id=" + attachmentId + "&Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }


  // Download Leave/AttachmentDownload?fileName=

  DownloadAttachment(fileName): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Leave/AttachmentDownload?fileName=" + fileName;
    return this.http.get(url, { responseType: 'blob' });
    return this.http
      .get(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }

  attachmentSaveUpdate(data): Observable<any> {
    const url = this.config.APIUrl + "Attachment/SaveUpdate?Login_Key=" + this.config.login_Key;
    return this.http.post(url, data, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }
}
