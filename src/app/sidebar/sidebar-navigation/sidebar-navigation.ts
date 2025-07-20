import {Component} from '@angular/core';
import {SidebarItem} from '../sidebar-item/sidebar-item';
import {RouterLink} from '@angular/router';

export interface NavigationItem {
  id: string;
  label: string;
  route: string;
  icon: string;
  active?: boolean;
}

@Component({
  selector: 'app-sidebar-navigation',
  imports: [
    SidebarItem,
    RouterLink
  ],
  templateUrl: './sidebar-navigation.html',
  styleUrl: './sidebar-navigation.css'
})
export class SidebarNavigation {
  protected navigationItems: NavigationItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      route: '/dashboard',
      icon: 'home',
    },
    {
      id: 'test-cases',
      label: 'Test Cases',
      route: '/test-cases',
      icon: 'clipboard-document-list'
    },
    {
      id: 'test-runs',
      label: 'Test Runs',
      route: '/test-runs',
      icon: 'play'
    },
    {
      id: 'kanban',
      label: 'Kanban Board',
      route: '/board',
      icon: 'squares-2x2'
    },
    {
      id: 'requirements',
      label: 'Requirements',
      route: '/requirements',
      icon: 'document-text'
    }
  ];

  getCurrentUser(): string {
    return 'Max Mustermann'; // In real app, get from auth service
  }

  getUserInitial(): string {
    const user = this.getCurrentUser();
    return user.split(' ').map(n => n[0]).join('').toUpperCase();
  }
}
