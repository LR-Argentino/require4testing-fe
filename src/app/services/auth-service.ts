import {effect, inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginUser} from '../models/login-user';
import {LoginResponse} from '../models/login-response';
import {Router} from '@angular/router';
import {firstValueFrom} from 'rxjs';
import {AppConstants} from '../utils/app-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private _isAuthenticated: WritableSignal<boolean> = signal(false);
  private _username: WritableSignal<string | null> = signal(null);
  private _token: WritableSignal<string | null> = signal(null);
  private _roles: WritableSignal<string | null> = signal(null);

  readonly isAuthenticated = this._isAuthenticated.asReadonly();

  constructor(private router: Router) {
    const token = localStorage.getItem(AppConstants.TOKEN);
    const username = localStorage.getItem(AppConstants.USERNAME);
    const roles = localStorage.getItem(AppConstants.ROLES);


    this._token.set(token);
    this._username.set(username);
    this._isAuthenticated.set(!!token);
    this._roles.set(roles);

    console.log(`Set Roles: ${roles}`);
    effect(() => {
      const token = this._token();
      const username = this._username();
      const roles = this._roles();
      if (token) {
        localStorage.setItem(AppConstants.TOKEN.toString(), token);
        localStorage.setItem(AppConstants.USERNAME.toString(), username || '');
        localStorage.setItem(AppConstants.ROLES.toString(), roles || '');
      } else {
        localStorage.removeItem(AppConstants.TOKEN.toString());
      }
    });
  }

  async login(user: LoginUser): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.http.post<LoginResponse>('api/auth/login', user)
      );
      if (response && response.token) {
        this._token.set(response.token);
        this._username.set(response.username);
        this._roles.set(Array.isArray(response.roles) ? JSON.stringify(response.roles) : response.roles);
        this._isAuthenticated.set(true);
      } else {
        throw new Error("Login failed: Invalid response from server");
      }
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    localStorage.removeItem(AppConstants.TOKEN);
    localStorage.removeItem(AppConstants.USERNAME);
    localStorage.removeItem(AppConstants.ROLES);

    this._token.set(null);
    this._username.set(null);
    this._roles.set(null);
    this._isAuthenticated.set(false);

    await this.router.navigate(['/login']);
  }
}
