import {Component} from '@angular/core';
import {SidebarNavigation} from '../sidebar/sidebar-navigation/sidebar-navigation';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [
    SidebarNavigation,
    RouterOutlet
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css'
})
export class MainLayout {
  getPageTitle(): string {
    // In a real app, you would get this from the router or a service
    return 'Dashboard';
  }

  getPageDescription(): string {
    // In a real app, you would get this from the router or a service
    return 'Monitor your test management activities';
  }
}
