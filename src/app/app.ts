import {Component, inject, signal, WritableSignal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AuthService} from './services/auth-service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
  ],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  authService = inject(AuthService);
  isLoggedIn: WritableSignal<boolean> = signal(false);

  constructor() {
    if (this.authService.isAuthenticated()) {
      this.isLoggedIn.set(true);
    }
  }
}
