import {Component} from '@angular/core';
import {AuthService} from '../../services/auth-service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  constructor(private auth: AuthService) {
  }


  logout(): void {
    this.auth.logout();
  }
}
