import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-alert',
  imports: [],
  templateUrl: './confirm-alert.component.html',
  styleUrl: './confirm-alert.component.css',
})
export class ConfirmAlertComponent {
  @Input() message: string = 'Apakah anda yakin untuk mengajukan?';
  @Input() show: boolean = false;
  @Output() confirmed = new EventEmitter<boolean>();

  onConfirm(result: boolean) {
    this.confirmed.emit(result);
  }
}
