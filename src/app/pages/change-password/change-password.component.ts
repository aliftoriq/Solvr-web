import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-change-password',
  imports: [FormsModule, CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  [x: string]: any;
 oldPassword: string = '';
  newPassword: string = '';
  showOldPassword = false;
  showNewPassword = false;

  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private authService: AuthService, private readonly router: Router) {}

  toggleOldPasswordVisibility() {
    this.showOldPassword = !this.showOldPassword;
  }

  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  }

  changePassword() {
    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.authService.changePassword(this.oldPassword, this.newPassword).subscribe({
      next: () => {
        this.successMessage = 'Password berhasil diganti!';
        this.oldPassword = '';
        this.newPassword = '';
        this.loading = false;

         setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 500); 
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Gagal mengganti password.';
        this.loading = false;
      },
    });

    
  }
}
