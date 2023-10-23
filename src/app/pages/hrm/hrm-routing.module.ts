import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard, AuthGuardSuperAdmin } from "src/app/utility/auth.gaurds";
import { EmployeesComponent } from "./employees/employees.component";
import { EditEmployeeComponent } from "./employees/edit-employee/edit-employee.component";
import { SiteLayoutComponent } from "src/app/_layout/site-layout/site-layout.component";
import { EmployeeComponent } from "./employee/employee.component";
import { EditUsersComponent } from "./employee/edit-users/edit-users.component";
import { EmployeeInfoComponent } from "./employee-info/employee-info.component";
import { UserWorkingAssociationComponent } from "./user-working-association/user-working-association.component";

import { MyLeavesComponent } from "./my-leaves/my-leaves.component";
import { LMSDashboardComponent } from "./lms-dashboard/lms-dashboard.component";
import { AchieveEmployeeComponent } from "./employee/achieve-employee/achieve-employee.component";
import { LeavePolicyComponent } from "./leave-policy/leave-policy.component";
import { LmsReportsComponent } from "./lms-reports/lms-reports.component";
import { ManagerLeavesComponent } from "./manager-leaves/manager-leaves.component";

const routes: Routes = [
  {
    path: "hrm",
    component: SiteLayoutComponent,
    children: [
      { path: "edit-employee", component: EditEmployeeComponent },
      { path: "edit-employee/:Id", component: EditEmployeeComponent },

      { path: "employees", component: EmployeeComponent },

      { path: "MyLeave", component: MyLeavesComponent },
      { path: "MyLeave/:Id", component: MyLeavesComponent },
      { path: "ManagerLeave", component: ManagerLeavesComponent },
      { path: "lmsdashboard", component: LMSDashboardComponent },
      { path: "lmsdashboard/:Id", component: LMSDashboardComponent },
      {
        path: "user-working-association",
        component: UserWorkingAssociationComponent,
      },

      { path: "edit-employees/:Id", component: EditUsersComponent },
      { path: "employee-info/:Id", component: EmployeeInfoComponent },
      { path: "achieve_employee", component: AchieveEmployeeComponent },
      { path: "leave-policy", component: LeavePolicyComponent },
      { path: "lms-reports", component: LmsReportsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HrmRoutingModule {}
