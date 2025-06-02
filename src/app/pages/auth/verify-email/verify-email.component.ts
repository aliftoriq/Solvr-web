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

    console.log('VerifyEmailComponent initialized');
    console.log('Current route:', this.routes.snapshot.routeConfig?.path);
    console.log('Query params:', this.routes.snapshot.queryParamMap.keys);

    console.log('API URL:', environment.apiUrl);
    console.log('Token from query params:', token);
    console.log('Status:', this.status);
  }
}
