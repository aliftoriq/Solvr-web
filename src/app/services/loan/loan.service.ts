import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { environment } from '../../../environment/env.staging';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  private baseUrl = environment.apiUrl + '/loan-application';
  constructor(private http: HttpClient, private authService: AuthService) {}

  getLoanApplicationDetail(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  rejectLoanApplication(id: string, notes: string): Observable<any> {
    return this.http.put<any>(
      `${this.baseUrl}/${id}/reject`,
      { notes },
      {
        headers: this.authService.getAuthHeaders(),
      }
    );
  }

  getHistoryLoanApplication(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/history`, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  getDashboardSUmmary(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/dashboard-summary`, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  // reviewLoanApplication(id: string, notes: string): Observable<any> {
  //   return this.http.post<any>(`${this.baseUrl}/loan-application/review`, { id, notes });
  // }

  // getLoanApplicationById(id: string): Observable<any> {
  //   return this.http.get<any>(`${this.baseUrl}/loan-application/${id}`);
  // }
}
