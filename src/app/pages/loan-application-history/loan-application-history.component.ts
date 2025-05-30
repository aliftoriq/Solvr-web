import { Component, OnInit } from '@angular/core';
import { LoanService } from '../../services/loan/loan.service';
import { CommonModule } from '@angular/common';
import { ReviewNotesComponent } from '../../component/review-notes/review-notes.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-loan-application-history',
  standalone: true,
  imports: [CommonModule, FormsModule, ReviewNotesComponent],
  templateUrl: './loan-application-history.component.html',
  styleUrl: './loan-application-history.component.css',
})
export class LoanApplicationHistoryComponent implements OnInit {
  selectedLoan: any = null;
  loanApplications: any[] = [];
  filteredLoans: any[] = [];
  loanSearchQuery: string = '';
  currentPage = 1;
  itemsPerPage = 10;
  loading: boolean = false;
  error: string | null = null;

  constructor(private readonly loanService: LoanService) {}

  ngOnInit(): void {
    this.fetchLoanApplications();
  }

  fetchLoanApplications(): void {
    this.loading = true;
    this.loanService.getHistoryLoanApplication().subscribe({
      next: (response) => {
        this.loanApplications = response;
        this.filteredLoans = response; // Inisialisasi filter awal
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching loan applications', error);
        this.error =
          'Failed to load loan applications. Please try again later.';
        this.loading = false;
      },
    });
  }

  filterLoans(): void {
    const query = this.loanSearchQuery.toLowerCase();
    this.filteredLoans = this.loanApplications.filter((loan) => {
      const name = loan.userCustomer?.name?.toLowerCase() || '';
      const nik = loan.userCustomer?.nik || '';
      return name.includes(query) || nik.includes(query);
    });
    this.currentPage = 1; // Reset ke halaman pertama
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredLoans.length / this.itemsPerPage);
  }

  openReviewModal(loan: any): void {
    this.selectedLoan = loan;
  }

  closeReviewModal(): void {
    this.selectedLoan = null;
  }
}
