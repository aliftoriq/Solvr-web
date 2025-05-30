import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { TopbarComponent } from "../topbar/topbar.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [SidebarComponent, TopbarComponent, RouterModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
