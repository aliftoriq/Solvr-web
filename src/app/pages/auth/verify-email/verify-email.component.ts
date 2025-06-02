import { Component } from '@angular/core';
import { routes } from '../../../app.routes';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment/env.staging';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-verify-email',
  imports: [CommonModule],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css',
})
export class VerifyEmailComponent {
  status: 'loading' | 'success' | 'expired' = 'loading';

  constructor(
    private routes: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const token = this.routes.snapshot.queryParamMap.get('token');
    if (!token) {
      this.status = 'expired';
      return;
    }
    this.authService.verifyEmail(token).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.status = 'success';
        } else {
          this.status = 'expired';
        }
      },
      error: () => {
        this.status = 'expired';
      },
    });
  }
}
