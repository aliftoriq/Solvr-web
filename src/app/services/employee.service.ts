import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private employeeUrl = 'http://localhost:8080/api/v1/user/employee';
  private branchApiUrl = 'http://localhost:8080/api/v1/admin/branch';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  addEmployee(employeeData: any): Observable<any> {
    return this.http.post(this.employeeUrl, employeeData, { headers: this.getAuthHeaders() });
  }

  getEmployees(): Observable<any> {
    return this.http.get(this.employeeUrl, { headers: this.getAuthHeaders() });
  }

  getEmployeesDetail(): Observable<any>{
    return this.http.get(this.employeeUrl + '/detail', { headers: this.getAuthHeaders() });
  }

  getBranches(): Observable<any> {
    return this.http.get(this.branchApiUrl, { headers: this.getAuthHeaders() });
  }
}
