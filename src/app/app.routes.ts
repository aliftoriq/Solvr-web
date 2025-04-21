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
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { RoleManagementComponent } from './pages/role-management/role-management.component';

export const routes: Routes = [
  // Public routes (tanpa layout)
  { path: 'login', component: LoginComponent },
  { path: 'change-password', component: ChangePasswordComponent },

  // Protected routes dengan layout
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'employee', component: EmployeePageComponent },
      { path: 'approval-bm', component: ApprovalBmPageComponent },
      { path: 'review-marketing', component: ReviewMarketingPageComponent },
      { path: 'employee-details', component: EmployeeDetailsComponent },
      { path: 'role-manager', component: RoleManagementComponent },
    ],
  },

  // Not found fallback
  { path: '**', component: NotFoundComponent },
];



@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}