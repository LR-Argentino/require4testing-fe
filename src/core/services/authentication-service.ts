import {computed, effect, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginRequest} from '../../shared/models/login-request';
import {LoginResponse} from '../../shared/models/login-response';
import {User} from '../../shared/models/user';
import {Router} from '@angular/router';

interface AuthenticationState {
  token: string | null;
  user: User | null;
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
    user: null,
    isLoading: false,
    error: null
  })

  public readonly token = computed(() => this._state().token);
  public readonly user = computed(() => this._state().user);
  public readonly isLoading = computed(() => this._state().isLoading);
  public readonly error = computed(() => this._state().error);

  public readonly isAuthenticated = computed(() => {
    return this.token() !== null && this.user() !== null;
  })

  constructor() {
    this.loadTokenFromStorage();

    effect(() => {
      const isAuthenticated = this.isAuthenticated();
      const token = this.token();

      if (isAuthenticated && token) {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('roles', this.user()!.role)
        localStorage.setItem('username', this.user()!.username);
      } else {
        localStorage.removeItem('auth_token');
      }
    });

    effect(() => {
      const error = this.error();

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
          id: null,
          username: response.username,
          email: response.email,
          role: response.roles[0]
        };

        this._state.update(state => ({
          ...state,
          user: user,
          token: response.token,
          isLoading: false,
          error: null
        }));


        // TODO: Navigate to the main page or dashboard after successful login
        this.router.navigate((['/'])).then((response) => {
          if (!response) {
            console.error('Navigation failed after login');
          }
        })
      },
      error: (err) => {
        this._state.update(state => ({
          ...state,
          isLoading: false,
          error: 'Login failed, please check your credentials.'
        }));
      }
    });
  }

  public logout(): void {
    this._state.update(state => ({
      ...state,
      isLoading: true,
      error: null
    }));

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
      user: null,
      isLoading: false,
      error: null
    }));

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
        user: {
          id: null,
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
        user: null,
        isLoading: false,
        error: null
      }));
    }
  }
}
