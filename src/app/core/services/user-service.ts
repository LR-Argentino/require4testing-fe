import {computed, DestroyRef, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../../shared/models/user';
import {catchError, map, Observable, of} from 'rxjs';

interface UserState {
  users: User[];
  user?: User;
  isLoading: boolean;
  error: string | null;
}

interface BatchUserPost {
  [key: string]: User;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);
  private readonly USER_URL = 'api/users';

  private readonly _state = signal<UserState>({
    users: [],
    isLoading: false,
    error: null
  });

  public readonly users = computed(() => this._state().users);

  constructor() {
  }

  public getUserById(userId: number) {
    this._state.update(state => ({
      ...state,
      isLoading: true,
      error: null
    }));

    return this.http.get<User>(`${this.USER_URL}/${userId}`)
      .subscribe({
        next: (user: User) => {
          this._state.update(state => ({
            ...state,
            user: user,
            isLoading: false,
            error: null
          }));
        },
        error: (error: Error) => {
          this._state.update(state => ({
            ...state,
            isLoading: false,
            error: error.message
          }));
          console.error('Error fetching user:', error);
        }
      });
  }

  public getUsersByIds(userIds: number[]): Observable<Map<number, User>> {
    if (userIds.length === 0) {
      return of(new Map());
    }

    const uniqueIds = [...new Set(userIds)];

    return this.http.post<{ [key: string]: User }>(`${this.USER_URL}/batch`, uniqueIds)
      .pipe(
        map(response => {
          const userMap = new Map<number, User>();
          Object.entries(response).forEach(([id, user]) => {
            userMap.set(Number(id), user);
          });
          return userMap;
        }),
        catchError(error => {
          console.error('Error loading users:', error);
          return of(new Map<number, User>());
        })
      );
  }
}
