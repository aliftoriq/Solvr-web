import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private baseUrl = 'http://localhost:8080/api/v1/loan-application';
  constructor(private http: HttpClient) { }

   getLoanApplicationDetail(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/loan-application/${id}`);
  } 

  reviewLoanApplication(id: string, notes: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/loan-application/review`, { id, notes });
  }
}
