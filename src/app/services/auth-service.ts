import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginUser} from '../models/LoginUser';
import {LoginResponse} from '../models/LoginResponse';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  isAuthenticated: WritableSignal<boolean> = signal(false);

  constructor(private router: Router) {
  }

  async login(username: string, password: string): Promise<void> {
    const user: LoginUser = {
      username: username,
      password: password
    }
    this.http.post<LoginResponse>('api/auth/login', user).subscribe((response): void => {
      if (response != undefined || response != null) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.username);
        localStorage.setItem('roles', JSON.stringify(response.roles));
        this.isAuthenticated.set(true);
        this.router.navigate(['/']);
      } else {
        throw new Error("Login failed: Invalid response from server");
      }
    })
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('roles');
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }
}
