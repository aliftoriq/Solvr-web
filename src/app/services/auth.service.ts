import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'auth_token';
  private readonly name = 'auth_name';
  private readonly role = 'auth_role';
  private readonly feature = 'auth_feature';
  private readonly isBrowser: boolean;

  private readonly authUrl = 'http://localhost:8080/api/v1/auth';
  
  private tokenCache: string | null = null;

  constructor(
    private readonly http: HttpClient,
    @Inject(PLATFORM_ID) private readonly platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);  
    if (this.isBrowser) {
      this.tokenCache = localStorage.getItem(this.tokenKey);
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.authUrl+'/login', {
      username,
      password
    }).pipe(
      tap((res) => {
        if (this.isBrowser && res.data?.token) {
          localStorage.setItem(this.tokenKey, res.data.token);
          this.tokenCache = res.data.token;
          
          // Store other user data
          if (res.data.user?.name) localStorage.setItem(this.name, res.data.user.name);
          if (res.data.user?.role) localStorage.setItem(this.role, res.data.user.role);
          if (res.data.features) localStorage.setItem(this.feature, res.data.features);
        }
      })
    );
  }

  getToken(): string | null {
    if (this.tokenCache) {
      return this.tokenCache;
    }
    
    if (this.isBrowser) {
      this.tokenCache = localStorage.getItem(this.tokenKey);
      return this.tokenCache;
    }
    
    return null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.name);
      localStorage.removeItem(this.role);
      localStorage.removeItem(this.feature);
      this.tokenCache = null;
    }
  }

  getName(): string | null {
    return this.isBrowser ? localStorage.getItem(this.name) : null;
  }

  getRole(): string | null {
    return this.isBrowser ? localStorage.getItem(this.role) : null;
  }

  getFeature(): string | null {
    return this.isBrowser ? localStorage.getItem(this.feature) : null;
  }


  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
  return this.http.post<any>(
    this.authUrl + '/change-password',
    { oldPassword, newPassword },
    { headers: this.getAuthHeaders() },
  ).pipe(
    tap((res) => {
      if (this.isBrowser && res.data?.token) {
        localStorage.setItem(this.tokenKey, res.data.token);
        this.tokenCache = res.data.token;
      }
    })
  );
}
}