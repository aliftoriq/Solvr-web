import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-review-notes',
  imports: [CommonModule, FormsModule],
  templateUrl: './review-notes.component.html',
  styleUrl: './review-notes.component.css'
})
export class ReviewNotesComponent {
  @Input() loan: any;
  @Output() close = new EventEmitter<void>();
  @Output() submitReview = new EventEmitter<{ loanId: string, notes: string }>();

  notes: string = '';

  closeModal(): void {
    this.close.emit();
  }

  submit(): void {
    this.submitReview.emit({ loanId: this.loan.id, notes: this.notes });
  }
}