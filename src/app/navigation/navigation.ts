import {Component} from '@angular/core';

interface NavigationItem {
  label: string;
  href: string;
  active: boolean;
}

@Component({
  selector: 'app-navigation',
  imports: [],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css'
})
export class Navigation {
  isMobileMenuOpen = false;

  navigationItems: NavigationItem[] = [
    {label: 'Dashboard', href: '#', active: true},
    {label: 'Requirements', href: '#', active: false},
    {label: 'Test Cases', href: '#', active: false},
    {label: 'Test Runs', href: '#', active: false},
  ];

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
