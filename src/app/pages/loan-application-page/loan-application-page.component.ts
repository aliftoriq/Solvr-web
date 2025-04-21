import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface LoanApplication{

}

@Component({
  selector: 'app-loan-application-page',
  imports: [],
  templateUrl: './loan-application-page.component.html',
  styleUrl: './loan-application-page.component.css'
})
export class LoanApplicationPageComponent {
  loanApplications: LoanApplication = []

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage) {
      const token = localStorage.getItem('auth_token');
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      // Make the GET request to fetch employee data
      this.http.get<LoanApplication[]>('http://localhost:8080/api/v1/user/employee', { headers })
        .subscribe({
          next: (data) => {
            this.loanApplications = data; 
          },
          error: (err) => {
            console.error('Failed to fetch employees', err); // Handle errors
          },
        });
    }
  }
}
