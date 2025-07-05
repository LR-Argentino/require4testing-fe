import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from '@angular/router';
import {AuthService} from '../../services/auth-service';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject((ActivatedRoute));

  isMobileMenuOpen = signal(false);
  isProfileMenuOpen = signal(false);

  navigationItems = [
    {name: 'Dashboard', href: '/'},
    {name: 'Tests', href: '/tests'},
    {name: 'Requirements', href: '/requirements/new'},
    {name: 'Participants', href: '/participants'}
  ];

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(value => !value);
    this.isProfileMenuOpen.set(false);
  }

  toggleProfileMenu(): void {
    this.isProfileMenuOpen.update(value => !value);
    this.isMobileMenuOpen.set(false);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  async signout(): Promise<void> {
    await this.authService.logout();
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
    await this.router.navigate([returnUrl]);
  }
}
