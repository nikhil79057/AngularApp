import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard, AuthGuardSuperAdmin } from "src/app/utility/auth.gaurds";
import { SiteLayoutComponent } from "src/app/_layout/site-layout/site-layout.component";

const routes: Routes = [
  {
    path: "",
    component: SiteLayoutComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountsRoutingModule {}
