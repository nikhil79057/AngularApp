import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AccountsRoutingModule } from "./accounts-routing.module";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AttachmentsModule } from "../global-attachment/attachments.module";

import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { NgSelectModule } from "@ng-select/ng-select";
// import { EmployeeTransactionComponent } from './employee-expenses/employee-transaction/employee-transaction.component';
// import { EmployeePlByDateComponent } from 'src/app/reports/employee-pl-by-date/employee-pl-by-date.component';

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AttachmentsModule,
    MatTableModule,
    MatPaginatorModule,
    NgSelectModule,
    MatSortModule,
  ],
})
export class AccountsModule {}
