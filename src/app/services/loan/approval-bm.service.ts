import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/env.staging';

@Injectable({
  providedIn: 'root',
})
export class ApprovalBmService {
  private baseUrl = environment.apiUrl + '/loan-application';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getBmApproval(): Observable<any> {
    return this.http.get(`${this.baseUrl}/branch-manager`, {
      headers: this.getAuthHeaders(),
    });
  }

  reviewLoanApplication(id: string, notes: string): Observable<any> {
    const url = `${this.baseUrl}/${id}/approve`;

    const body = { notes };

    return this.http.put(url, body, { headers: this.getAuthHeaders() });
  }
}
