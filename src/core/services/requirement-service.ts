import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Requirement} from '../../shared/models/requirement';
import {User} from '../../shared/models/user';
import {RequirementUserBatchDto} from '../../shared/models/requirement-user-batch-dto';

interface RequirementState {
  error: string | null;
  isLoading: boolean;
  requirements: RequirementUserBatchDto[]
}


@Injectable({
  providedIn: 'root'
})
export class RequirementService {
  private readonly BASE_URL = "/api/requirements";
  private readonly USERS_BATCH_URL = "/api/users/batch";
  private readonly http = inject(HttpClient);

  private _state = signal<RequirementState>({
    error: null,
    isLoading: false,
    requirements: [],
  });

  public readonly requirements = computed(() => this._state().requirements);

  constructor() {
  }

  public getRequirements(): void {
    this._state.update(state => ({...state, isLoading: true, error: null}));

    this.http.get<Requirement[]>(this.BASE_URL).subscribe({
      next: (requirements) => {
        const userIds = [...new Set(requirements.map(req => req.createdBy))];

        this.http.post<Map<string, User>>(this.USERS_BATCH_URL, userIds).subscribe({
          next: (users) => {

            const userMap = Object.fromEntries(
              Object.values(users).map((user: User) => [String(user.id), user])
            );

            const requirementsWithUser = requirements.map(req => ({
              ...req,
              user: userMap[String(req.createdBy)]
            }));

            this._state.update(state => ({
              ...state,
              isLoading: false,
              requirements: requirementsWithUser
            }));
            console.log('Requirements loaded:', requirementsWithUser);
          },
          error: (error) => {
            this._state.update(state => ({
              ...state,
              isLoading: false,
              error: error.message || 'Failed to load users'
            }));
          }
        })
      },
      error: (error) => {
        this._state.update(state => ({
          ...state,
          isLoading: false,
          error: error.message || 'Failed to load requirements'
        }));
      }
    });
  }
}

