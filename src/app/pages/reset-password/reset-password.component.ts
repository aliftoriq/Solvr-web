import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router'; // ✅ Yang benar
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  imports: [FormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  showNewPassword = false;
  showConfirmPassword = false;

  loading = false;
  successMessage = '';
  errorMessage = '';

  private token: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  resetPassword() {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Password dan konfirmasi tidak cocok.';
      return;
    }

    this.loading = true;
    this.authService.resetPassword(this.token, this.newPassword).subscribe({
      next: () => {
        this.successMessage = 'Password berhasil direset!';
        this.loading = false;

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Gagal mereset password.';
        this.loading = false;
      },
    });
  }
}
