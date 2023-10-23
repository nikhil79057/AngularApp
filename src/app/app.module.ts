import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { Config } from "./utility/config";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from "@angular/http";
import {
  AuthGuard,
  AuthGuardSuperAdmin,
  RoleGuard,
} from './utility/auth.gaurds';
import { SiteLayoutComponent } from "./_layout/site-layout/site-layout.component";
import { SiteHeaderComponent } from "./_layout/site-header/site-header.component";
import { SiteSidebarComponent } from "./_layout/site-sidebar/site-sidebar.component";
import { NotificationBarComponent } from "./_layout/notification-bar/notification-bar.component";
import { SiteFooterComponent } from "./_layout/site-footer/site-footer.component";
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { NgxPaginationModule } from "ngx-pagination";
import { ClipboardModule } from "ngx-clipboard";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { DatePipe } from "@angular/common";
import { NgxSortableModule } from "ngx-sortable";
import { FileUploadModule } from "ng2-file-upload";
import { SelectDropDownModule } from "ngx-select-dropdown";
import { ChartsModule } from "ng2-charts";
import { EmployeesComponent } from "./pages/hrm/employees/employees.component";
import { EditEmployeeComponent } from "./pages/hrm/employees/edit-employee/edit-employee.component";
import { LoginComponent } from "./pages/auth/login/login.component";
import { ForgotPasswordComponent } from "./pages/auth/forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./pages/auth/reset-password/reset-password.component";
import { LogoutComponent } from "./pages/auth/logout/logout.component";
import { ProfileComponent } from "./pages/auth/profile/profile.component";
import { HrmModule } from "./pages/hrm/hrm.module";
import { AccountsModule } from "./pages/accounts/accounts.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatPseudoCheckboxModule } from "@angular/material/core";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { LookupheadComponent } from "./pages/lookuphead/lookuphead.component";
import { MyfirmComponent } from "./pages/myfirm/myfirm.component";
import { BankComponent } from "./pages/myfirm/bank/bank.component";
import { PatnerComponent } from "./pages/myfirm/patner/patner.component";
import { AttachmentsService } from "./pages/global-attachment/attachments.service";
import { AttachmentsModule } from "./pages/global-attachment/attachments.module";
import { ImportantLinksComponent } from "./pages/devtools/important-links/important-links.component";
import { SocialmediaComponent } from "./pages/devtools/socialmedia/socialmedia.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { NgSelectModule } from "@ng-select/ng-select";
import { DepartmentComponent } from "./pages/devtools/department/department.component";
import { ToastNotificationsModule } from "ngx-toast-notifications";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { MatNativeDateModule } from "@angular/material/core";
import { MyQrCodeComponent } from './pages/attendence/my-qr-code/my-qr-code.component';
import { LmsTimeDashboardComponent } from './pages/attendence/time-dashboard/lms-time-dashboard/lms-time-dashboard.component';
import { TimesheetDashboardComponent } from './pages/attendence/timesheet-dashboard/timesheet-dashboard.component';
import { AddNewTimesheetComponent } from './pages/attendence/forms/add-new-timesheet/add-new-timesheet.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { ScanQrCodeComponent } from './pages/attendence/scan-qr-code/scan-qr-code.component';
import { NgxScannerQrcodeModule, LOAD_WASM } from 'ngx-scanner-qrcode';
LOAD_WASM().subscribe((res: any) => console.log('LOAD_WASM', res));
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SiteLayoutComponent,
    SiteHeaderComponent,
    SiteSidebarComponent,
    NotificationBarComponent,
    SiteFooterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ProfileComponent,
    EmployeesComponent,
    LogoutComponent,
    EditEmployeeComponent,
    LookupheadComponent,
    MyfirmComponent,
    BankComponent,
    PatnerComponent,
    ImportantLinksComponent,
    SocialmediaComponent,
    DepartmentComponent,
    MyQrCodeComponent,
    LmsTimeDashboardComponent,
    TimesheetDashboardComponent,
    AddNewTimesheetComponent,
    ScanQrCodeComponent,
  ],
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule,
    ChartsModule,
    NgxPaginationModule,
    FileUploadModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    NgxUiLoaderModule,
    NgxPaginationModule,
    HttpClientModule,
    AngularEditorModule,
    NgxSortableModule,
    SelectDropDownModule,
    CKEditorModule,
    ClipboardModule,
    HrmModule,
    AccountsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ToastNotificationsModule.forRoot({ duration: 2000 }),
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatPseudoCheckboxModule,
    AttachmentsModule,
    MatExpansionModule,
    MatIconModule,
    NgSelectModule,
    MatDialogModule,
    NgxQRCodeModule,
    NgxScannerQrcodeModule,


  ],
  exports: [MatInputModule],
  providers: [
    Config,
    AuthGuard,
    AuthGuardSuperAdmin,
    RoleGuard,
    DatePipe,
    ToastrModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }










