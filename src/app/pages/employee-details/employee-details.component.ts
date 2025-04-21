import { Component } from '@angular/core';
import { SidebarComponent } from "../../layout/sidebar/sidebar.component";
import { TopbarComponent } from "../../layout/topbar/topbar.component";
import { EmployeeService } from '../../services/employee.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-details',
  imports: [FormsModule, CommonModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent {
user: any = null;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getEmployeesDetail().subscribe({
      next: (res: any) => {
        this.user = res?.data;
      },
      error: (err) => {
        console.error('Gagal mengambil data user:', err);
      }
    });
  }
}
