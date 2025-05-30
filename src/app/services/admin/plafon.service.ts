import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../auth.service';
import { environment } from '../../../environment/env.staging';

@Injectable({
  providedIn: 'root',
})
export class PlafonService {
  private readonly baseUrl = environment.apiUrl;

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) {}

  getPlafon(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/plafon/all`);
  }

  addPlafon(plafon: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/plafon`, plafon, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  updatePlafon(plafonId: string, plafon: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/plafon/${plafonId}`, plafon, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  deletePlafon(plafonId: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/plafon/${plafonId}`, {
      headers: this.authService.getAuthHeaders(),
    });
  }
}
