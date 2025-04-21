import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { SidebarComponent } from "../../layout/sidebar/sidebar.component";
import { TopbarComponent } from "../../layout/topbar/topbar.component";
import { FooterComponent } from "../../layout/footer/footer.component";
import { EmployeeService } from '../../services/employee.service';
import { FormsModule } from '@angular/forms';

interface Branch {
  id: string;
  name: string;
  longitude: number;
  latitude: number;
}

interface Employee {
  id: string;
  name: string;
  nip: string;
  email: string;
  department: string;
  branch: Branch;
}

@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrl: './employee-page.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class EmployeePageComponent implements OnInit {
  employees: Employee[] = []; 
  
  branches: Branch[] = [];

  constructor(private readonly http: HttpClient, private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => this.employees = data,
      error: (err) => console.error('Failed to fetch employees', err)
    });

    this.employeeService.getBranches().subscribe({
      next: (data) => this.branches = data,
      error: (err) => console.error('Failed to fetch branches', err)
    });
  }


  newEmployee = {
    name: '',
    nip: '',
    email: '',
    department: '',
    branch: ''
  };
  errorMessage: string = '';


   // Call service to add new employee
  addEmployee() {
    if (this.newEmployee.name && this.newEmployee.nip && this.newEmployee.email && this.newEmployee.department && this.newEmployee.branch) {
      const employeeData = {
        name: this.newEmployee.name,
        nip: this.newEmployee.nip,
        email: this.newEmployee.email,
        department: this.newEmployee.department,
        branch: {
          id: this.newEmployee.branch
        }
      };

      this.employeeService.addEmployee(employeeData).subscribe({
        next: (response) => {
          console.log('Employee added successfully!', response);
          this.employees.push(response);  
          this.resetForm();
        },
        error: (error) => {
          console.error('Error adding employee', error);
          this.errorMessage = 'Failed to add employee.';
        }
      });
    }
  }



  // Fetch and display branches
  fetchBranches() {
    this.employeeService.getBranches().subscribe(
      response => {
        console.log('Branches fetched successfully', response);
        // Handle branch data if needed
      },
      error => {
        console.error('Error fetching branches', error);
      }
    );
  }

  // Reset form after adding employee
  resetForm() {
    this.newEmployee = { name: '', nip: '', email: '', department: '', branch: '' };
  }
}
