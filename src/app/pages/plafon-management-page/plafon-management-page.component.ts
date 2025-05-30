import { Component } from '@angular/core';
import { Plafon } from '../../core/models.service';
import { PlafonService } from '../../services/admin/plafon.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-plafon-management-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './plafon-management-page.component.html',
  styleUrl: './plafon-management-page.component.css',
})
export class PlafonManagementPageComponent {
  plafons: Plafon[] = [];
  newPlafon: Partial<Plafon> = {};
  searchTerm: string = '';
  selectedPlafonId: number | null = null;
  errorMessage: string = '';

  constructor(private plafonService: PlafonService) {}

  ngOnInit(): void {
    this.fetchPlafons();
  }

  fetchPlafons() {
    this.plafonService.getPlafon().subscribe({
      next: (response) => (this.plafons = response.data),
      error: (err) => console.error('Failed to fetch plafons', err),
    });
  }

  selectPlafon(plafon: Plafon) {
    this.newPlafon = { ...plafon };
    this.selectedPlafonId = plafon.id;
  }

  addPlafon() {
    if (!this.newPlafon.name?.trim() || !this.newPlafon.amount) {
      this.errorMessage = 'Name and Amount are required.';
      return;
    }

    this.plafonService.addPlafon(this.newPlafon).subscribe({
      next: (data) => {
        this.plafons.push(data);
        this.resetForm();
        this.fetchPlafons();
      },
      error: (err) => {
        console.error('Failed to add plafon', err);
        this.errorMessage = 'Failed to add plafon. Please try again.';
      },
    });
  }

  updatePlafon() {
    if (!this.newPlafon.name?.trim() || !this.newPlafon.amount) {
      this.errorMessage = 'Name and Amount are required.';
      return;
    }

    this.plafonService
      .updatePlafon(this.selectedPlafonId!.toString(), this.newPlafon)
      .subscribe({
        next: (data) => {
          const index = this.plafons.findIndex(
            (p) => p.id === this.selectedPlafonId
          );
          if (index !== -1) {
            const updated = [...this.plafons];
            updated[index] = data;
            this.plafons = updated;
          }
          this.resetForm();
          this.fetchPlafons();
        },
        error: (err) => {
          console.error('Failed to update plafon', err);
          this.errorMessage = 'Failed to update plafon. Please try again.';
        },
      });
  }

  deletePlafon(plafonId: number) {
    this.plafonService.deletePlafon(plafonId).subscribe({
      next: () => {
        this.plafons = this.plafons.filter((p) => p.id !== plafonId);
      },
      error: (err) => {
        console.error('Failed to delete plafon', err);
        this.errorMessage = 'Failed to delete plafon. Please try again.';
      },
    });
  }

  cancelEdit() {
    this.resetForm();
  }

  get filteredPlafons(): Plafon[] {
    return this.plafons.filter((p) =>
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  private resetForm() {
    this.newPlafon = {};
    this.selectedPlafonId = null;
    this.errorMessage = '';
  }
}
