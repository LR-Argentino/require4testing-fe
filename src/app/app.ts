import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {AuthService} from './services/auth-service';

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

  constructor(private router: Router, private auth: AuthService) {
  }

  ngOnInit() {
    console.log('App');
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
