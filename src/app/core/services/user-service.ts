import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../../shared/models/user';

interface UserState {
  users: User[];
  isLoading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly USER_URL = 'api/users';

  private readonly _state = signal<UserState>({
    users: [],
    isLoading: false,
    error: null
  });

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
            users: [user],
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
}
