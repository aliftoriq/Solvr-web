import { Component } from '@angular/core';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { TopbarComponent } from '../../layout/topbar/topbar.component';
import { ApprovalBmService } from '../../services/loan/approval-bm.service';
import { CommonModule } from '@angular/common';
import { ReviewNotesComponent } from '../../component/review-notes/review-notes.component';

@Component({
  selector: 'app-approval-bm-page',
  imports: [CommonModule, ReviewNotesComponent],
  templateUrl: './approval-bm-page.component.html',
  styleUrl: './approval-bm-page.component.css',
})
export class ApprovalBmPageComponent {
  loanApplications: any[] = [];
  selectedLoan: any = null;

  constructor(private readonly approvalBmService: ApprovalBmService) {}

  ngOnInit(): void {
    this.approvalBmService.getBmApproval().subscribe((response) => {
      this.loanApplications = response.data;
      console.log(this.loanApplications);
    });
  }

  openReviewModal(loan: any): void {
    this.selectedLoan = loan;
  }

  closeReviewModal(): void {
    this.selectedLoan = null;
  }

  submitReview(reviewData: { loanId: string; notes: string }): void {
    this.approvalBmService
      .reviewLoanApplication(reviewData.loanId, reviewData.notes)
      .subscribe({
        next: () => {
          alert('Review berhasil dikirim.');
          this.closeReviewModal();
          this.ngOnInit();
        },
        error: (err) => {
          console.error(err);
          alert('Gagal mengirim review.');
        },
      });
  }
}
