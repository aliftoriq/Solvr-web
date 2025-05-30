import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Branch } from '../../core/models.service';
import { environment } from '../../../environment/env.staging';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  private readonly baseUrl = environment.apiUrl;
  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) {}

  getAllBranch(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/admin/branch`, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  createBranch(branch: Branch): Observable<any> {
    const body = {
      name: branch.name,
      longitude: branch.longitude,
      latitude: branch.latitude,
    };

    return this.http.post<any>(`${this.baseUrl}/admin/branch`, body, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  updateBranch(id: string, branch: Branch): Observable<Branch> {
    const body = {
      name: branch.name,
      longitude: branch.longitude,
      latitude: branch.latitude,
    };
    return this.http.put<Branch>(`${this.baseUrl}/admin/branch/${id}`, branch, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  deleteBranch(branchId: string): Observable<any> {
    const url = `${this.baseUrl}/admin/branch/${branchId}`;
    return this.http.delete<any>(url, {
      headers: this.authService.getAuthHeaders(),
    });
  }
}
