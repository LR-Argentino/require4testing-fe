import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AuthenticationService} from '../core/services/authentication-service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet
  ],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly authService = inject(AuthenticationService);

  constructor() {
  }


  onTapLogin(): void {
    this.authService.login({username: 'testuser', password: 'password'});
  }
}
