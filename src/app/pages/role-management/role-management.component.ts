import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Module from 'module';
import { RoleService } from '../../services/admin/role.service';

interface Feature {
  id: string;
  name: string;
}

interface Role {
  id: number;
  name: string;
  featureLists: Feature[];
}

@Component({
  selector: 'app-role-management',
  imports: [CommonModule, FormsModule],
  templateUrl: './role-management.component.html',
  styleUrl: './role-management.component.css'
})
export class RoleManagementComponent {
  roles: Role[] = [];
  selectedRole: Role | null = null;
  allFeatures: Feature[] = [];
  featureSearchQuery: string = '';

  showSearch: boolean = false;


  constructor(private roleService: RoleService, private http: HttpClient) {}

  ngOnInit(): void {
    this.roleService.getAllRoles().subscribe(res => {
      this.roles = res.data;
    });

    this.roleService.getAllFeatures().subscribe(res => {
      this.allFeatures = res.data;
    });
  }

  selectRole(role: Role) {
    this.allFeatures = this.filteredFeatures;
    this.selectedRole = role;
  }

  hasFeature(featureId: string): boolean {
    return !!this.selectedRole?.featureLists.find(f => f.id === featureId);
  }

  toggleFeature(feature: Feature) {
    if (!this.selectedRole) return;

    const has = this.hasFeature(feature.id);
    const roleId = this.selectedRole.id;
    const featureId = feature.id;

    if (has) {
      // DELETE hanya satu fitur
      this.roleService.deleteRoleToFeatureMany(roleId, [featureId])
        .subscribe({
          next: () => {
            this.selectedRole!.featureLists = this.selectedRole!.featureLists.filter(f => f.id !== featureId);
          },
          error: (err) => {
            console.error('Failed to remove feature:', err);
            alert('Gagal menghapus fitur dari role ini.');
          }
        });
    } else {
      // CREATE hanya satu fitur
      this.roleService.createRoleToFeatureMany(roleId, [featureId])
        .subscribe({
          next: () => {
            // Tambah hanya kalau belum ada (safety double check)
            if (!this.hasFeature(featureId)) {
              this.selectedRole!.featureLists = [...this.selectedRole!.featureLists, feature];
            }
          },
          error: (err) => {
            console.error('Failed to add feature:', err);
            alert('Gagal menambahkan fitur ke role ini.');
          }
        });
    }
  }


  get filteredFeatures(): Feature[] {
    const query = this.featureSearchQuery.trim().toLowerCase();
    let filtered = this.allFeatures;

    if (query) {
      filtered = filtered.filter(f => f.name.toLowerCase().includes(query));
    }

    const hasFeatureIds = new Set(this.selectedRole?.featureLists.map(f => f.id));
    
    const withFeature = filtered.filter(f => hasFeatureIds.has(f.id));
    const withoutFeature = filtered.filter(f => !hasFeatureIds.has(f.id));

    return [...withFeature, ...withoutFeature];
  }


}

