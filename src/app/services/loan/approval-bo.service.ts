import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/env.staging';

@Injectable({
  providedIn: 'root',
})
export class ApprovalBoService {
  private baseUrl = environment.apiUrl + '/loan-application';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getBoApproval(): Observable<any> {
    return this.http.get(`${this.baseUrl}/backoffice`, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  reviewLoanApplication(id: string, notes: string): Observable<any> {
    const url = `${this.baseUrl}/${id}/disburse`;

    const body = { notes };

    return this.http.put(url, body, {
      headers: this.authService.getAuthHeaders(),
    });
  }
}
