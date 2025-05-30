import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModelsService {
  constructor() {}
}

export interface Branch {
  id: string;
  name: string;
  longitude: number;
  latitude: number;
}

export interface Plafon {
  id: number;
  name: string;
  amount: number;
  level: number;
  interestRate: number;
  maxTenorMonths: number;
}

export interface Role {
  id: string;
  name: string;
}

export interface Employee {
  id: string;
  name: string;
  nip: string;
  email: string;
  department: string;
  branch: Branch;
  role: Role;
}

export interface EmployeeRequest {
  id: string;
  name: string;
  nip: string;
  email: string;
  department: string;
  branchId: string;
  roleId: number;
}
