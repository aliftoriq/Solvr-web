import { Component } from '@angular/core';
import { routes } from '../../../app.routes';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment/env.staging';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify-email',
  imports: [CommonModule],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css',
})
export class VerifyEmailComponent {
  status: 'loading' | 'success' | 'expired' = 'loading';

  constructor(private routes: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const token = this.routes.snapshot.queryParamMap.get('token');
    if (token) {
      this.http.post(`${environment.apiUrl}/auth/verify`, { token }).subscribe({
        next: () => (this.status = 'success'),
        error: () => (this.status = 'expired'),
      });
    } else {
      this.status = 'expired';
    }
  }
}
