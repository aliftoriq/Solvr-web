import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { environment } from '../../../environment/env.staging';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private readonly baseUrl = environment.apiUrl;
  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) {}

  getAllRoles(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/roles', {
      headers: this.authService.getAuthHeaders(),
    });
  }

  getAllFeatures(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/feature', {
      headers: this.authService.getAuthHeaders(),
    });
  }

  createRoleToFeatureMany(
    roleId: number,
    listFeatureId: string[]
  ): Observable<any> {
    const url = `${this.baseUrl}/feature/role-to-feature/many`;
    const body = { roleId, listFeatureId };
    return this.http.post<any>(url, body, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  deleteRoleToFeatureMany(
    roleId: number,
    listFeatureId: string[]
  ): Observable<any> {
    const url = `${this.baseUrl}/feature/role-to-feature/many`;
    const body = { roleId, listFeatureId };
    return this.http.delete<any>(url, {
      headers: this.authService.getAuthHeaders(),
      body,
    });
  }
}
