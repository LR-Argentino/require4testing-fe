import {computed, inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginRequest} from '../../../shared/models/login-request';
import {LoginResponse} from '../../../shared/models/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly httpClient = inject(HttpClient);

  private readonly _token: WritableSignal<string | null> = signal<string | null>(null);
  private readonly _username: WritableSignal<string | null> = signal<string | null>(null);
  private readonly _isLoading: WritableSignal<boolean> = signal<boolean>(false);
  private readonly _error: WritableSignal<string | null> = signal<string | null>(null);

  public readonly token: Signal<string | null> = this._token.asReadonly();
  public readonly username: WritableSignal<string | null> = signal<string | null>(null);
  public readonly isLoading: Signal<boolean> = this._isLoading.asReadonly();

  public readonly isAuthenticated = computed(() => {
    return this.token() !== null && this.username() != null;
  })

  constructor() {
  }

  public login(request: LoginRequest): void {
    this._isLoading.set(true);
    this._error.set(null);

    this.httpClient.post<LoginResponse>('api/auth/login', request).subscribe({
      next: (response: LoginResponse) => {
        this._username.set(response.username);
        this._token.set(response.token);

        // TODO: Navigate to the main page or dashboard after successful login
        this._isLoading.set(false);
      },
      error: (err) => {
        this._error.set('Login failed, please check your credentials.');
        this._isLoading.set(false);
      }
    });
  }
}
