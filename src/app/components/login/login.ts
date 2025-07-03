import {Component, inject, signal, WritableSignal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth-service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginUser} from '../../models/LoginUser';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject((ActivatedRoute));
  username: string = "";
  password: string = "";

  credentials: WritableSignal<LoginUser> = signal({username: '', password: ''});
  isLoading: WritableSignal<boolean> = signal(false);
  errorMessage: WritableSignal<string> = signal('');


  async login(): Promise<void> {
    if (!this.username || !this.password) {
      this.errorMessage.set('Please enter username and password');
      return;
    }
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.credentials.set({username: this.username, password: this.password});
    try {
      await this.authService.login(this.credentials());
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
      await this.router.navigate([returnUrl]);
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed. Please check your credentials.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
