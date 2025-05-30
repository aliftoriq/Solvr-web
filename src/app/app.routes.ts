import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { EmployeePageComponent } from './pages/employee-page/employee-page.component';
import { ApprovalBmPageComponent } from './pages/approval-bm-page/approval-bm-page.component';
import { ReviewMarketingPageComponent } from './pages/review-marketing-page/review-marketing-page.component';
import { EmployeeDetailsComponent } from './pages/employee-details/employee-details.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { RoleManagementComponent } from './pages/role-management/role-management.component';
import { BranchManagementPageComponent } from './pages/branch-management-page/branch-management-page.component';
import { ApprovalBoPageComponent } from './pages/employee/approval-bo-page/approval-bo-page.component';
import { PlafonManagementPageComponent } from './pages/plafon-management-page/plafon-management-page.component';
import { LoanApplicationHistoryComponent } from './pages/loan-application-history/loan-application-history.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { VerifyEmailComponent } from './pages/auth/verify-email/verify-email.component';

export const routes: Routes = [
  // Public routes (tanpa layout)
  { path: '', component: LandingPageComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'verify-email', component: VerifyEmailComponent },

  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'employee', component: EmployeePageComponent },
      { path: 'approval-bm', component: ApprovalBmPageComponent },
      { path: 'review-marketing', component: ReviewMarketingPageComponent },
      { path: 'approval-bo', component: ApprovalBoPageComponent },
      { path: 'employee-details', component: EmployeeDetailsComponent },
      { path: 'role-manager', component: RoleManagementComponent },
      { path: 'branch-manager', component: BranchManagementPageComponent },
      { path: 'plafon-management', component: PlafonManagementPageComponent },
      { path: 'loan-history', component: LoanApplicationHistoryComponent },
    ],
  },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
