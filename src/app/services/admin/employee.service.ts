import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { environment } from '../../../environment/env.staging';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private employeeUrl = environment.apiUrl + '/user/employee';
  private branchApiUrl = environment.apiUrl + '/admin/branch';
  private authUrl = environment.apiUrl + '/auth';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  addEmployee(employeeData: any): Observable<any> {
    return this.http.post(this.employeeUrl, employeeData, {
      headers: this.getAuthHeaders(),
    });
  }

  createEmployee(employeeData: any): Observable<any> {
    return this.http.post(this.employeeUrl, employeeData, {
      headers: this.getAuthHeaders(),
    });
  }

  updateEmployee(employeeId: string, employeeData: any): Observable<any> {
    return this.http.put(`${this.employeeUrl}/${employeeId}`, employeeData, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteEmployee(employeeId: string): Observable<any> {
    return this.http.delete(`${this.employeeUrl}/${employeeId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  getAllEmployee(): Observable<any> {
    return this.http.get(this.employeeUrl, { headers: this.getAuthHeaders() });
  }

  getEmployeesDetail(): Observable<any> {
    return this.http.get(this.employeeUrl + '/detail', {
      headers: this.getAuthHeaders(),
    });
  }

  getBranches(): Observable<any> {
    return this.http.get(this.branchApiUrl, { headers: this.getAuthHeaders() });
  }

  forgetPassword(username: string): Observable<any> {
    return this.http.post(
      this.authUrl + '/forget-password',
      { username },
      {
        headers: this.getAuthHeaders(),
      }
    );
  }
}
