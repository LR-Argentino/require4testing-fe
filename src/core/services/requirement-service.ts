import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Requirement} from '../../shared/models/requirement';
import {User} from '../../shared/models/user';
import {RequirementUserBatchDto} from '../../shared/models/requirement-user-batch-dto';
import {catchError, finalize, of, switchMap} from 'rxjs';

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
    this._state.update(state => ({
      ...state,
      isLoading: true,
      error: null
    }))

    this.http.get<Requirement[]>(this.BASE_URL).pipe(
      switchMap(requirements => {
        const userIds = this.extractUniqueUserIds(requirements);
        return this.http.post<Map<string, User>>(this.USERS_BATCH_URL, userIds).pipe(
          switchMap(users => {
            const enrichedRequirements = this.enrichRequirementsWithUsers(requirements, users);
            return of(enrichedRequirements);
          })
        );
      }),
      catchError(error => {
        this._state.update(state => ({
          ...state,
          isLoading: false,
          error: error.message || 'Failed to load requirements'
        }))
        return of([]);
      }),
      finalize(() => {
        this._state.update(state => ({
          ...state,
          isLoading: false
        }));
      })
    ).subscribe({
      next: (requirementsWithUser) => {
        this._state.update(state => ({
          ...state,
          requirements: requirementsWithUser,
          error: null
        }));
        console.log('Requirements loaded:', requirementsWithUser);
      }
    });
  }

  private extractUniqueUserIds(requirements: Requirement[]): string[] {
    return [...new Set(requirements.map(req => String(req.createdBy)))];
  }

  private enrichRequirementsWithUsers(
    requirements: Requirement[],
    users: Map<string, User>
  ): RequirementUserBatchDto[] {
    const userMap = this.createUserMap(users);

    return requirements.map(req => ({
      ...req,
      user: userMap[String(req.createdBy)] || null
    }));
  }

  private createUserMap(users: Map<string, User>): Record<string, User> {
    return Object.fromEntries(
      Object.values(users).map((user: User) => [String(user.id), user])
    );
  }


}

