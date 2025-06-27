import {Component} from '@angular/core';
import {AuthService} from '../../services/auth-service';
import {Navbar} from '../navbar/navbar';

@Component({
  selector: 'app-dashboard',
  imports: [
    Navbar
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  constructor(private auth: AuthService) {
  }


  logout(): void {
    this.auth.logout();
  }
}
