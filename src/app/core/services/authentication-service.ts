import {computed, effect, inject, Injectable, Signal, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginRequest} from '../../login-form/model/login-request';
import {LoginResponse} from '../../login-form/model/login-response';
import {User} from '../../../shared/models/user';
import {Router} from '@angular/router';
import {LoggedInUser} from '../../../shared/models/logged-in-user';

interface AuthenticationState {
  token: string | null;
  loggedInUser: LoggedInUser | null;
  isLoading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly _state = signal<AuthenticationState>({
    token: null,
    loggedInUser: null,
    isLoading: false,
    error: null
  })

  public readonly token: Signal<string | null> = computed(() => this._state().token);
  public readonly user: Signal<LoggedInUser | null> = computed(() => this._state().loggedInUser);
  public readonly isLoading: Signal<boolean> = computed(() => this._state().isLoading);
  public readonly error: Signal<string | null> = computed(() => this._state().error);

  public readonly isAuthenticated = computed(() => {
    return this.token() !== null && this.user() !== null;
  })

  constructor() {
    this.loadTokenFromStorage();

    effect(() => {
      const isAuthenticated = this.isAuthenticated();
      const token = this._state().token;

      if (isAuthenticated && token) {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('roles', this.user()!.role)
        localStorage.setItem('username', this.user()!.username);
      } else {
        localStorage.removeItem('auth_token');
      }
    });

    effect(() => {
      const error = this._state().error;

      if (error) {
        console.error('Authentication error:', error);

        // TODO: Show a user-friendly error message in the UI (toast, alert, etc.)
      }
    })
  }

  public login(request: LoginRequest): void {
    this._state.update(state => ({
      ...state,
      isLoading: true,
      error: null
    }));

    this.httpClient.post<LoginResponse>('api/auth/login', request).subscribe({
      next: (response: LoginResponse) => {
        const user: User = {
          id: response.id,
          username: response.username,
          email: response.email,
          role: response.roles[0]
        };

        this._state.update(state => ({
          ...state,
          token: response.token,
          loggedInUser: user,
          isLoading: false,
          error: null
        }))

        this.router.navigate((['/'])).then((response) => {
          if (!response) {
            console.error('Navigation failed after login');
          }
          console.log(response);
        })
      },
      error: (err) => {
        this._state.update(state => ({
          ...state,
          isLoading: false,
          error: 'Login failed, please check your credentials.' + err
        }))
      }
    });
  }

  public logout(): void {
    this._state.update(state => ({
      ...state,
      isLoading: true,
      error: null
    }))

    this.httpClient.post('api/auth/logout', null).subscribe({
      next: (response: any) => {
        this.clearAuthState();
      },
      error: (err) => {
        this._state.update(state => ({
          ...state,
          isLoading: false,
          error: 'Logout failed, please try again later.'
        }))
      }
    })
  }

  public clearAuthState(): void {
    this._state.update(state => ({
      ...state,
      token: null,
      loggedInUser: null,
      isLoading: false,
      error: null
    }))
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
      this._state.update(state => ({
        ...state,
        token: token,
        loggedInUser: {
          username: username,
          email: '',
          role: role
        },
        isLoading: false,
        error: null
      }))
    } else {
      this._state.update(state => ({
        ...state,
        token: null,
        loggedInUser: null,
        isLoading: false,
        error: null
      }));
    }
  }
}
