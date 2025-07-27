import {computed, DestroyRef, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Requirement} from '../../shared/models/requirement';
import {User} from '../../shared/models/user';
import {RequirementUserBatchDto} from '../../shared/models/requirement-user-batch-dto';
import {catchError, finalize, map, Observable, of, switchMap} from 'rxjs';
import {CreateRequirementDto} from '../../shared/models/create-requirement-dto';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Status} from '../../shared/enums/status';

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
  private readonly destroyRef = inject(DestroyRef)


  private _state = signal<RequirementState>({
    error: null,
    isLoading: false,
    requirements: [],
  });

  public readonly requirements = computed(() => this._state().requirements);
  public readonly notClosedRequirements = computed(() => this._state().requirements.filter(req => req.status !== Status.CLOSED));

  constructor() {
  }

  public getRequirements(): void {
    this.setLoadingAndErrorStateTo(true);

    this.http.get<Requirement[]>(this.BASE_URL).pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap(requirements => this.enrichRequirementsWithUsersAsync(requirements)),
      catchError(error => {
        this.setLoadingAndErrorStateTo(false, error.message || 'Failed to load requirements')
        return of([]);
      }),
      finalize(() => {
        this.setLoadingAndErrorStateTo(false);
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

  public createRequirement(requirement: CreateRequirementDto): void {
    this.setLoadingAndErrorStateTo(true);

    this.http.post<Requirement>(this.BASE_URL, requirement).pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap(createdRequirement =>
        this.enrichRequirementsWithUsersAsync([createdRequirement])
      ),
      catchError(error => {
        this.setLoadingAndErrorStateTo(false, error.message || 'Failed to create requirement');
        return of([]);
      }),
      finalize(() => {
        this.setLoadingAndErrorStateTo(false);
      })
    ).subscribe({
      next: (enrichedRequirements) => {
        if (enrichedRequirements.length > 0) {
          const newRequirement = enrichedRequirements[0];

          this._state.update(state => ({
            ...state,
            requirements: [...state.requirements, newRequirement],
            error: null
          }));

          console.log('Requirement created and added:', newRequirement);
        }
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

  private setLoadingAndErrorStateTo(isLoading: boolean, errorMessage: string | null = null): void {
    this._state.update(state => ({
      ...state,
      isLoading: isLoading,
      error: errorMessage
    }))
  }

  private enrichRequirementsWithUsersAsync(requirements: Requirement[]): Observable<RequirementUserBatchDto[]> {
    if (requirements.length === 0) {
      return of([]);
    }

    const userIds = this.extractUniqueUserIds(requirements);

    return this.http.post<Map<string, User>>(this.USERS_BATCH_URL, userIds).pipe(
      map(users => this.enrichRequirementsWithUsers(requirements, users))
    );
  }
}

