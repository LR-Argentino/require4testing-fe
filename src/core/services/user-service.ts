import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../shared/models/user';
import {catchError, finalize, of} from 'rxjs';
import {Router} from '@angular/router';


interface UserState {
  users: User[];
  isLoading?: boolean;
  error?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly BASE_URL = "/api/users";
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly _state = signal<UserState>({
    users: []
  });

  public readonly users = computed(() => this._state().users);

  public getUsers(): void {
    this.setLoadingAndErrorStateTo(true);
    this.http.get<User[]>(`${this.BASE_URL}`).pipe(
      catchError(error => {
        this.setLoadingAndErrorStateTo(false, error.message || 'Failed to load users');
        return of([]);
      }),
      finalize(() => {
        this.setLoadingAndErrorStateTo(false);
      })
    ).subscribe({
      next: (users: User[]) => {
        console.log(users);
        this._state.update(state => ({
          ...state,
          users: users,
          error: null
        }));
      }
    });
  }

  public signout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  private setLoadingAndErrorStateTo(isLoading: boolean, errorMessage: string | null = null): void {
    this._state.update(state => ({
      ...state,
      isLoading: isLoading,
      error: errorMessage
    }))
  }
}
