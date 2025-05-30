import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoanService } from '../../services/loan/loan.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

declare var bootstrap: any;

@Component({
  selector: 'app-review-notes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review-notes.component.html',
  styleUrls: ['./review-notes.component.css'],
})
export class ReviewNotesComponent {
  @Input() loan: any;
  @Output() close = new EventEmitter<void>();
  @Output() submitReview = new EventEmitter<{
    loanId: string;
    notes: string;
  }>();

  notes: string = '';
  loanDetail: any = null;
  marketingEmployee: any = null;
  userRole: string = '';
  currentSlideIndex: number = 0;
  isLoading: boolean = true;
  error: string | null = null;

  constructor(
    private readonly loanService: LoanService,
    private readonly authService: AuthService,
    private sanitizer: DomSanitizer
  ) {}

  getMapUrl(): SafeResourceUrl {
    if (this.loanDetail?.latitude && this.loanDetail?.longitude) {
      const url = `https://maps.google.com/maps?q=${this.loanDetail.latitude},${this.loanDetail.longitude}&z=15&output=embed`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl('');
  }

  ngOnInit(): void {
    this.userRole = this.authService.getRole() || '';
    console.log('User Role:', this.userRole);
    this.loadLoanDetails();
  }

  loadLoanDetails(): void {
    this.isLoading = true;
    this.error = null;

    this.loanService.getLoanApplicationDetail(this.loan.id).subscribe({
      next: (response) => {
        this.loanDetail = response.data;
        this.marketingEmployee = this.loanDetail.userEmployee.find(
          (emp: any) => emp.role.name === 'MARKETING'
        );
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading loan details:', error);
        this.error = 'Failed to load loan details. Please try again later.';
        this.isLoading = false;
      },
    });
  }

  closeModal(): void {
    this.close.emit();
  }

  submit(): void {
    this.submitReview.emit({
      loanId: this.loan.id,
      notes: this.notes,
    });
  }

  reject(): void {
    this.loanService.rejectLoanApplication(this.loan.id, this.notes).subscribe({
      next: () => {
        this.closeModal();
      },
      error: (error) => {
        console.error('Error rejecting loan:', error);
      },
    });
  }

  viewKTP(): void {
    if (this.loanDetail?.userCustomer?.urlKtp) {
      window.open(this.loanDetail.userCustomer.urlKtp, '_blank');
    } else {
      alert('KTP tidak tersedia');
    }
  }

  viewSelfie(): void {
    if (this.loanDetail?.userCustomer?.urlSelfieWithKtp) {
      window.open(this.loanDetail.userCustomer.urlSelfieWithKtp, '_blank');
    } else {
      alert('Foto selfie dengan KTP tidak tersedia');
    }
  }

  nextSlide(): void {
    if (this.currentSlideIndex < 2) {
      this.currentSlideIndex++;
    }
  }

  prevSlide(): void {
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex--;
    }
  }

  getSlideTitle(): string {
    const titles = [
      'Ringkasan Pinjaman',
      'Detail Nasabah',
      'Statistik & Review',
    ];
    return titles[this.currentSlideIndex];
  }

  getProgressWidth(role: string): number {
    if (!this.loanDetail) return 0;

    switch (role) {
      case 'MARKETING':
        return this.loanDetail.marketingNotes ? 33 : 0;
      case 'BRANCH MANAGER':
        return this.loanDetail.branchManagerNotes
          ? 66
          : this.loanDetail.marketingNotes
          ? 33
          : 0;
      case 'BACK OFFICE':
        return this.loanDetail.backOfficeNotes
          ? 100
          : this.loanDetail.branchManagerNotes
          ? 66
          : this.loanDetail.marketingNotes
          ? 33
          : 0;
      default:
        return 0;
    }
  }

  shouldShowNotesInput(): boolean {
    if (!this.userRole || !this.loanDetail) return false;

    switch (this.userRole) {
      case 'MARKETING':
        return !this.loanDetail.marketingNotes;
      case 'BRANCH MANAGER':
        return !this.loanDetail.branchManagerNotes;
      case 'BACK OFFICE':
        return !this.loanDetail.backOfficeNotes;
      default:
        return false;
    }
  }

  getNotesLabel(): string {
    switch (this.userRole) {
      case 'MARKETING':
        return 'Catatan Marketing';
      case 'BRANCH MANAGER':
        return 'Catatan Branch Manager';
      case 'BACK OFFICE':
        return 'Catatan Back Office';
      default:
        return 'Catatan';
    }
  }

  actionType: string = '';

  showConfirmation(action: string) {
    this.actionType = action;
    const modal = new bootstrap.Modal(
      document.getElementById('confirmationModal')
    );
    modal.show();
  }

  confirmAction() {
    switch (this.actionType) {
      case 'approve':
        this.submit();
        break;
      case 'reject':
        this.reject();
        break;
      case 'submit':
        this.submit();
        break;
      case 'disburse':
        this.submit();
        break;
    }
    this.actionType = '';
  }
}
