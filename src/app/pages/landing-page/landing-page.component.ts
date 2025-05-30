import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlafonService } from '../../services/admin/plafon.service';
import { Plafon } from '../../core/models.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  plafons: Plafon[] = [];

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

  // Format currency untuk menampilkan nominal rupiah
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  // Get card image berdasarkan level
  getCardImage(level: number): string {
    const cardImages: { [key: number]: string } = {
      1: '/card_bronze.svg',
      2: '/card_silver.svg',
      3: '/card_gold.svg',
      4: '/card_platinum.svg',
      5: '/card_diamond.svg',
    };
    return cardImages[level] || '/card_bronze.svg';
  }

  // Get level name berdasarkan level number
  getLevelName(level: number): string {
    const levelNames: { [key: number]: string } = {
      1: 'Basic',
      2: 'Silver',
      3: 'Gold',
      4: 'Platinum',
      5: 'Diamond',
    };
    return levelNames[level] || 'Standard';
  }
}
