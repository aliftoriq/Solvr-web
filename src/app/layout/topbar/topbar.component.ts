import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-topbar',
  imports: [CommonModule,  FormsModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
  
export class TopbarComponent {
  name: string | null = 'User';
  role: string | null = 'User Role';
  showMenu = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.name = this.authService.getName();
    this.role = this.authService.getRole();
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  logout(): void {
    this.authService.logout();
    window.location.reload(); 
  }
}
