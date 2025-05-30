import { Component, OnInit } from '@angular/core';
import { ReviewMarketingService } from '../../services/loan/review-marketing.service';
import { CommonModule } from '@angular/common';
import { ReviewNotesComponent } from '../../component/review-notes/review-notes.component';

@Component({
  selector: 'app-review-marketing-page',
  imports: [CommonModule, ReviewNotesComponent],
  templateUrl: './review-marketing-page.component.html',
  styleUrl: './review-marketing-page.component.css',
})
export class ReviewMarketingPageComponent implements OnInit {
  title = 'Review Marketing Page';
  loanApplications: any[] = [];
  selectedLoan: any = null;

  constructor(
    private readonly reviewMarketingService: ReviewMarketingService
  ) {}

  ngOnInit(): void {
    this.reviewMarketingService.getMarketingReview().subscribe((response) => {
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

  showSuccessPopup(): void {
    alert('Review berhasil dikirim.');
    this.closeReviewModal();
    this.ngOnInit();
  }

  showErrorPopup(): void {
    alert('Gagal mengirim review.');
  }

  submitReview(reviewData: { loanId: string; notes: string }): void {
    this.reviewMarketingService
      .reviewLoanApplication(reviewData.loanId, reviewData.notes)
      .subscribe({
        next: () => {
          this.showSuccessPopup();
          this.closeReviewModal();
          this.ngOnInit();
        },
        error: (err) => {
          console.error(err);
          this.showErrorPopup();
        },
      });
  }
}
