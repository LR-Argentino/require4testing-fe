import {computed, effect, inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginRequest} from '../../login-form/model/login-request';
import {LoginResponse} from '../../login-form/model/login-response';
import {User} from '../../../shared/models/user';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly _token: WritableSignal<string | null> = signal<string | null>(null);
  private readonly _user: WritableSignal<User | null> = signal<User | null>(null);
  private readonly _isLoading: WritableSignal<boolean> = signal<boolean>(false);
  private readonly _error: WritableSignal<string | null> = signal<string | null>(null);

  public readonly token: Signal<string | null> = this._token.asReadonly();
  public readonly user: Signal<User | null> = this._user.asReadonly();
  public readonly isLoading: Signal<boolean> = this._isLoading.asReadonly();
  public readonly error: Signal<string | null> = this._error.asReadonly();

  public readonly isAuthenticated = computed(() => {
    return this.token() !== null && this.user() !== null;
  })

  constructor() {
    this.loadTokenFromStorage();

    effect(() => {
      const isAuthenticated = this.isAuthenticated();
      const token = this._token();

      if (isAuthenticated && token) {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('roles', this.user()!.role)
        localStorage.setItem('username', this.user()!.username);
      } else {
        localStorage.removeItem('auth_token');
      }
    });

    effect(() => {
      const error = this._error();

      if (error) {
        console.error('Authentication error:', error);

        // TODO: Show a user-friendly error message in the UI (toast, alert, etc.)
      }
    })
  }

  public login(request: LoginRequest): void {
    this._isLoading.set(true);
    this._error.set(null);

    this.httpClient.post<LoginResponse>('api/auth/login', request).subscribe({
      next: (response: LoginResponse) => {
        const user: User = {
          username: response.username,
          email: response.email,
          role: response.roles[0]
        };

        this._user.set(user);
        this._token.set(response.token);

        // TODO: Navigate to the main page or dashboard after successful login
        this.router.navigate((['/'])).then((response) => {
          if (!response) {
            console.error('Navigation failed after login');
          }
          console.log(response);
        })
        this._isLoading.set(false);
      },
      error: (err) => {
        this._error.set('Login failed, please check your credentials.');
        this._isLoading.set(false);
      }
    });
  }

  public logout(): void {
    this._isLoading.set(true);
    this._error.set(null);

    this.httpClient.post('api/auth/logout', null).subscribe({
      next: (response: any) => {
        this.clearAuthState();
      },
      error: (err) => {
        this._error.set('Logout failed, please try again later.');
        return [];
      }
    })
  }

  public clearAuthState(): void {
    this._token.set(null);
    this._user.set(null);
    this._isLoading.set(false);
    this._error.set(null);
    this.router.navigate(['/login']).then((response) => {
      if (!response) {
        console.error('Navigation failed after logout');
      }
    });
  }

  private loadTokenFromStorage(): void {
    const token = localStorage.getItem('auth_token');
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('roles');

    if (token && username && role) {
      this._token.set(token);
      this._user.set({
        username: username,
        email: '',
        role: role
      });
    } else {
      this._token.set(null);
      this._user.set(null);
    }
  }
}
