import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingService } from './services/loading.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // HARUS styleUrls
})
export class AppComponent {
  title = 'solvr-web';

  constructor(private loadingService: LoadingService) {}

  get loading$() {
    return this.loadingService.loading$;
  }
}
