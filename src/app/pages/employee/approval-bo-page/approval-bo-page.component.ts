import { Component } from '@angular/core';
import { ApprovalBmService } from '../../../services/loan/approval-bm.service';
import { ApprovalBoService } from '../../../services/loan/approval-bo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReviewNotesComponent } from '../../../component/review-notes/review-notes.component';

@Component({
  selector: 'app-approval-bo-page',
  imports: [CommonModule, FormsModule, ReviewNotesComponent],
  templateUrl: './approval-bo-page.component.html',
  styleUrl: './approval-bo-page.component.css',
})
export class ApprovalBoPageComponent {
  loanApplications: any[] = [];
  selectedLoan: any = null;

  constructor(private readonly approvalBoService: ApprovalBoService) {}

  ngOnInit(): void {
    this.approvalBoService.getBoApproval().subscribe((response) => {
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
    this.approvalBoService
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
