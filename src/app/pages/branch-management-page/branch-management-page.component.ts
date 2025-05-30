import { Component } from '@angular/core';
import { BranchService } from '../../services/admin/branch.service';
import { Branch } from '../../core/models.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-branch-management-page',
  standalone: true, 
  imports: [FormsModule, CommonModule],
  templateUrl: './branch-management-page.component.html',
  styleUrl: './branch-management-page.component.css'
})
  
export class BranchManagementPageComponent {
  branches: Branch[] = []; 
  newBranch: Branch = { id: '', name: '', longitude: 0, latitude: 0 }; 
  errorMessage: string = ''; 
  searchTerm: string = '';
  selectedBranchId: string | null = null;


  constructor(private readonly branchService: BranchService) {}

  ngOnInit(): void {
    this.branchService.getAllBranch().subscribe({
      next: (data) => this.branches = data,
      error: (err) => console.error('Failed to fetch branches', err)
    }); 
  }

  selectBranch(branch: Branch) {
    this.newBranch = { ...branch };
    this.selectedBranchId = branch.id;
  }


  addBranch() {

    if (!this.newBranch.name.trim()) {
      this.errorMessage = 'Branch name is required.';
      return;
    }

    if (this.newBranch.longitude === 0 || this.newBranch.latitude === 0) {
      this.errorMessage = 'Longitude and Latitude cannot be 0.';
      return;
    }
    this.branchService.createBranch(this.newBranch).subscribe({ 
      next: (data) => {
        this.branches.push(data); 
        this.newBranch = { id: '', name: '', longitude: 0, latitude: 0 }; 
      },
      error: (err) => {
        console.error('Failed to add branch', err);
        this.errorMessage = 'Failed to add branch. Please try again.';
      }
    });
  }

  editBranch(branch: Branch) {
    this.newBranch = { ...branch };
    this.selectedBranchId = branch.id;
  }


  deleteBranch(branchId: string) {
    console.log('Deleting branch with ID:', branchId); // ⬅️ Tambahkan ini
    this.branchService.deleteBranch(branchId).subscribe({
      next: () => {
        this.branches = this.branches.filter(branch => branch.id !== branchId);
      },
      error: (err) => {
        console.error('Failed to delete branch', err);
        this.errorMessage = 'Failed to delete branch. Please try again.';
      }
    });
  }

  get filteredBranches(): Branch[] {
    return this.branches.filter(branch =>
      branch.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  
  
  updateBranch() {
    if (!this.newBranch.name.trim()) {
      this.errorMessage = 'Branch name is required.';
      return;
    }

    if (this.newBranch.longitude === 0 || this.newBranch.latitude === 0) {
      this.errorMessage = 'Longitude and Latitude cannot be 0.';
      return;
    }

    this.branchService.updateBranch(this.selectedBranchId!, this.newBranch).subscribe({
      next: (data) => {
        const index = this.branches.findIndex(b => b.id === this.selectedBranchId);
        if (index !== -1) this.branches[index] = data;

        this.newBranch = { id: '', name: '', longitude: 0, latitude: 0 };
        this.selectedBranchId = null;
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Failed to update branch', err);
        this.errorMessage = 'Failed to update branch. Please try again.';
      }
    });
  }

  cancelEdit() {
    this.newBranch = { id: '', name: '', longitude: 0, latitude: 0 };
    this.selectedBranchId = null;
    this.errorMessage = '';
  }



}
