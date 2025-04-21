import { Component, OnInit } from '@angular/core';
import { ReviewMarketingService } from '../../services/review-marketing.service';
import { SidebarComponent } from "../../layout/sidebar/sidebar.component";
import { TopbarComponent } from "../../layout/topbar/topbar.component";
import { CommonModule } from '@angular/common';
import { ReviewNotesComponent } from "./review-notes/review-notes.component";

@Component({
  selector: 'app-review-marketing-page',
  imports: [CommonModule, SidebarComponent, TopbarComponent, ReviewNotesComponent],
  templateUrl: './review-marketing-page.component.html',
  styleUrl: './review-marketing-page.component.css'
})
export class ReviewMarketingPageComponent implements OnInit {
  title = 'Review Marketing Page';
  loanApplications: any[] = [];
  selectedLoan: any = null;

  constructor(private readonly reviewMarketingService: ReviewMarketingService) { }

  ngOnInit(): void {
    this.reviewMarketingService.getMarketingReview().subscribe((response) => {
      this.loanApplications = response;
      console.log(this.loanApplications);
    });
  }

  openReviewModal(loan: any): void {
    this.selectedLoan = loan;
  }

  closeReviewModal(): void {
    this.selectedLoan = null;
  }

  submitReview(reviewData: { loanId: string, notes: string }): void {
    this.reviewMarketingService.reviewLoanApplication(reviewData.loanId, reviewData.notes).subscribe({
      next: () => {
        alert('Review berhasil dikirim.');
        this.closeReviewModal();
        this.ngOnInit();
      },
      error: (err) => {
        console.error(err);
        alert('Gagal mengirim review.');
      }
    });
  }
}