import {effect, inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginUser} from '../models/LoginUser';
import {LoginResponse} from '../models/LoginResponse';
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

    effect(() => {
      const token = this._token();
      const username = this._username();
      const roles = this._roles();
      if (token) {
        localStorage.setItem(AppConstants.TOKEN, token);
        localStorage.setItem(AppConstants.USERNAME, username || '');
        localStorage.setItem(AppConstants.ROLES, JSON.stringify(roles));
      } else {
        localStorage.removeItem(AppConstants.TOKEN);
      }
    })
  }

  async login(user: LoginUser): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.http.post<LoginResponse>(AppConstants.LOGIN_ENDPOINT, user)
      );

      if (response && response.token) {
        this._token.set(response.token);
        this._username.set(response.username);
        this._roles.set(JSON.stringify(response.roles));
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
