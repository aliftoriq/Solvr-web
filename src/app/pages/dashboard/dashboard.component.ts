import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoanService } from '../../services/loan/loan.service';
import { AuthService } from '../../services/auth.service';

interface DashboardData {
  totalEmployees?: number;
  totalCustomers?: number;
  totalApplications?: number;
  approvedApplications?: number;
  disbursedApplications?: number;
  totalDisbursedAmount?: number;
  totalOutstandingAmount?: number;
  totalInterestIncome?: number;
  applicationsHandledByUser?: number;
  applicationsApprovedByUser?: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  dashboardData: DashboardData | null = null;
  userRole: string = '';
  isLoading: boolean = true;
  error: string | null = null;

  constructor(
    private loanService: LoanService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUserRole();
    this.loadDashboardData();
  }

  private getUserRole(): void {
    this.userRole = this.authService.getRole() || '';
  }

  private loadDashboardData(): void {
    this.isLoading = true;
    this.error = null;

    this.loanService.getDashboardSUmmary().subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.dashboardData = response.data;
        } else {
          this.error = 'Failed to load dashboard data';
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
        this.error = 'An error occurred while loading dashboard data';
        this.isLoading = false;
      },
    });
  }

  formatCurrency(amount: number | undefined): string {
    if (amount === undefined || amount === null) {
      return 'Rp 0';
    }

    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  getApprovalRate(): number {
    if (!this.dashboardData) return 0;

    if (this.userRole === 'SUPER_ADMIN') {
      const total = this.dashboardData.totalApplications || 0;
      const approved = this.dashboardData.approvedApplications || 0;
      return total > 0 ? Math.round((approved / total) * 100) : 0;
    } else {
      const handled = this.dashboardData.applicationsHandledByUser || 0;
      const approved = this.dashboardData.applicationsApprovedByUser || 0;
      return handled > 0 ? Math.round((approved / handled) * 100) : 0;
    }
  }

  refreshDashboard(): void {
    this.loadDashboardData();
  }
}
