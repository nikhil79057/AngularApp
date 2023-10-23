import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard, AuthGuardSuperAdmin } from './utility/auth.gaurds';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { LookupheadComponent } from './pages/lookuphead/lookuphead.component';
import { MyfirmComponent } from './pages/myfirm/myfirm.component';
// import { DaybookComponent } from "./pages/project-management/daybook/daybook.component";
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { ImportantLinksComponent } from './pages/devtools/important-links/important-links.component';
import { SocialmediaComponent } from './pages/devtools/socialmedia/socialmedia.component';
import { EmployeeDocumentComponent } from './pages/hrm/employee-document/employee-document.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { DepartmentComponent } from './pages/devtools/department/department.component';
import { MyQrCodeComponent } from './pages/attendence/my-qr-code/my-qr-code.component';
import { LmsTimeDashboardComponent } from './pages/attendence/time-dashboard/lms-time-dashboard/lms-time-dashboard.component';
import { TimesheetDashboardComponent } from './pages/attendence/timesheet-dashboard/timesheet-dashboard.component';
import { ScanQrCodeComponent } from './pages/attendence/scan-qr-code/scan-qr-code.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'my-qr-code',
    
    component: MyQrCodeComponent
  },
  {
    path: 'scanner',
    
    component: ScanQrCodeComponent
  },
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        component: DashboardComponent,
      },

      {
        path: 'password-manager',
        canActivate: [AuthGuard],
        component: ImportantLinksComponent,
      },

      {
        path: 'socialmedia',
        canActivate: [AuthGuard],
        component: SocialmediaComponent,
      },
      // {
      //   path: "ResetPassword",

      //   component: ResetPasswordComponent
      // },
      {
        path: 'department',
        canActivate: [AuthGuard],
        component: DepartmentComponent,
      },
    
      {
        path: 'time-dashboard',
        canActivate: [AuthGuard],
        component: LmsTimeDashboardComponent
      },
      {
        path: 'timesheet-dashboard',
        canActivate: [AuthGuard],
        component: TimesheetDashboardComponent
      },

      {
        path: 'department/:Id',
        canActivate: [AuthGuard],
        component: DepartmentComponent,
      },
      {
        path: "lookuphead",

        component: LookupheadComponent,
      },
      {
        path: 'resetPassword',
        component: ResetPasswordComponent,
      },

      {
        path: 'Importantlink',
        canActivate: [AuthGuardSuperAdmin],
        component: ImportantLinksComponent,
      },
      { path: 'reset-password', component: ResetPasswordComponent },
      {
        path: 'myfirm',

        component: MyfirmComponent,
      },
    ],
  },

  // Bentex
  { path: 'bentex', component: LoginComponent },

  { path: 'login', component: LoginComponent },
  { path: 'ForgotPassword', component: ForgotPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
