import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' = 'success';

  get typeClass() {
    return {
      'alert-success': this.type === 'success',
      'alert-error': this.type === 'error',
    };
  }
}
