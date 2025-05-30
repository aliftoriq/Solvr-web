import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/admin/employee.service';
import { FormsModule } from '@angular/forms';
import { BranchService } from '../../services/admin/branch.service';
import { AlertComponent } from '../../component/alert/alert/alert.component';
import { SpinnerComponent } from '../../component/spinner/spinner/spinner.component';
import {
  Branch,
  Employee,
  EmployeeRequest,
  Role,
} from '../../core/models.service';
import { RoleService } from '../../services/admin/role.service';

@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrl: './employee-page.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule, AlertComponent, SpinnerComponent],
})
export class EmployeePageComponent implements OnInit {
  loading: boolean = false;
  alertMessage: string = '';
  alertType: 'success' | 'error' = 'success';

  employees: Employee[] = [];
  branches: Branch[] = [];

  roles: Role[] = [];

  branchName: string = '';

  newEmployee: Partial<EmployeeRequest> = { branchId: '', roleId: 0 };
  errorMessage: string = '';
  searchTerm: string = '';
  selectedEmployeeId: string | null = null;

  constructor(
    private readonly employeeService: EmployeeService,
    private readonly branchService: BranchService,
    private readonly roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.fetchEmployees();
    this.fetchBranches();
    this.fetchRoles();
  }

  fetchEmployees() {
    this.loading = true;
    this.employeeService.getAllEmployee().subscribe({
      next: (data) => (this.employees = data.data),
      error: (err) => console.error('Failed to fetch employees', err),
      complete: () => (this.loading = false),
    });
  }

  fetchRoles() {
    this.loading = true;
    this.roleService.getAllRoles().subscribe({
      next: (data) => {
        this.roles = data.data;
        console.log('Roles loaded:', this.roles);
      },
      error: (err) => console.error('Failed to fetch roles', err),
      complete: () => (this.loading = false),
    });
  }

  fetchBranches() {
    this.loading = true;
    this.branchService.getAllBranch().subscribe({
      next: (data) => {
        this.branches = data;
        console.log('Branches loaded:', this.branches);
      },
      error: (err) => console.error('Failed to fetch branches', err),
      complete: () => (this.loading = false),
    });
  }

  selectEmployee(employee: Employee) {
    this.newEmployee = { ...employee };
    this.newEmployee.branchId = employee.branch.id;
    this.newEmployee.roleId = Number(employee.role.id);
    console.log('Selected employee:', this.newEmployee);
    this.selectedEmployeeId = employee.id;
  }

  addEmployee() {
    if (!this.newEmployee.name?.trim() || !this.newEmployee.email?.trim()) {
      this.showAlert('Name and Email are required.', 'error');
      return;
    }

    this.loading = true;
    this.employeeService.createEmployee(this.newEmployee).subscribe({
      next: (data) => {
        this.employees.push(data);
        this.resetForm();
        const branch = this.branches.find(
          (branch) => branch.id === this.newEmployee.branchId
        );
        this.branchName = branch ? branch.name : '';
        this.showAlert('Employee added successfully!', 'success');
      },
      error: () => {
        this.showAlert('Failed to add employee. Please try again.', 'error');
      },
      complete: () => (this.loading = false),
    });
  }

  editEmployee(employee: Employee) {
    this.newEmployee = { ...employee };
    this.selectedEmployeeId = employee.id;
  }

  updateEmployee() {
    if (!this.newEmployee.name?.trim() || !this.newEmployee.email?.trim()) {
      this.showAlert('Name and Email are required.', 'error');
      return;
    }

    this.employeeService
      .updateEmployee(this.selectedEmployeeId!, this.newEmployee)
      .subscribe({
        next: (data) => {
          const index = this.employees.findIndex(
            (e) => e.id === this.selectedEmployeeId
          );
          if (index !== -1) this.employees[index] = data;
          this.resetForm();
          this.showAlert('Employee updated successfully!', 'success');
        },
        error: (err) => {
          console.error('Failed to update employee', err);
          this.showAlert(
            'Failed to update employee. Please try again.',
            'error'
          );
        },
      });
  }

  deleteEmployee(employeeId: string) {
    this.employeeService.deleteEmployee(employeeId).subscribe({
      next: () => {
        this.employees = this.employees.filter((emp) => emp.id !== employeeId);
        if (this.selectedEmployeeId === employeeId) {
          this.resetForm();
        }
        this.showAlert('Employee deleted successfully.', 'success');
      },
      error: (err) => {
        console.error('Failed to delete employee', err);
        this.showAlert('Failed to delete employee. Please try again.', 'error');
      },
    });
  }

  forgetPassword(employeeEmail: string) {
    this.loading = true;
    this.employeeService.forgetPassword(employeeEmail).subscribe({
      next: () => {
        this.showAlert('Email sent successfully!', 'success');
      },
      error: (err) => {
        console.error('Failed to send password reset link', err);
        this.showAlert(
          'Failed to send password reset link. Please try again.',
          'error'
        );
      },
      complete: () => (this.loading = false),
    });
  }

  selectBranch(branchId: string) {
    const selectedBranch = this.branches.find((b) => b.id === branchId);
    if (selectedBranch) {
      this.newEmployee.branchId = selectedBranch.id;
    }
  }

  get filteredEmployees(): Employee[] {
    return this.employees.filter((emp) =>
      emp.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  cancelEdit() {
    this.resetForm();
  }

  private resetForm() {
    this.newEmployee = { branchId: '', roleId: 0 };
    this.selectedEmployeeId = null;
    this.errorMessage = '';
  }

  showAlert(message: string, type: 'success' | 'error' = 'success') {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => (this.alertMessage = ''), 3000);
  }
}
