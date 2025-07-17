import {computed, DestroyRef, inject, Injectable, Signal, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Requirement} from '../../requirements/models/requirement';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {CreateRequirementDto, UpdateRequirementDto} from '../../requirements/models/create-update-requirement-dto';
import {Observable} from 'rxjs';

interface RequirementsState {
  requirements: Requirement[];
  currentRequirement: Requirement | null;
  userIds: number[];
  isLoading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class RequirementService {
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);
  private readonly REQUIREMENT_URL = 'api/requirements';

  private _state = signal<RequirementsState>({
    requirements: [],
    currentRequirement: null,
    userIds: [],
    isLoading: false,
    error: null
  });

  public readonly requirements: Signal<Requirement[]> = computed(() => this._state().requirements);
  public readonly currentRequirement: Signal<Requirement | null> = computed(() => this._state().currentRequirement);
  public readonly isLoading: Signal<boolean> = computed(() => this._state().isLoading);
  public readonly error: Signal<string | null> = computed(() => this._state().error);

  public fetchAllRequirements(): Observable<Requirement[]> {
    return this.http.get<Requirement[]>(this.REQUIREMENT_URL);
  }


  public getAllRequirements(): void {
    this._state.update(state => ({
      ...state,
      isLoading: true,
      error: null
    }));

    this.http.get<Requirement[]>(this.REQUIREMENT_URL)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: Requirement[]) => {
          const userIds = [...new Set(response.map(r => r.createdBy))];
          // TODO: Create RequirementFacade to fetch user details by IDs
          //  https://claude.ai/chat/135e1574-8752-4a76-8fcf-373e4b2f092b
          this._state.update(state => ({
            ...state,
            requirements: response,
            userIds: userIds,
            isLoading: false,
            error: null
          }));
        },
        error: (error: Error) => {
          console.error('Error fetching requirements:', error);
          this._state.update(state => ({
            ...state,
            isLoading: false,
            error: error.message
          }));
        }
      })
  }

  public getRequirementById(id: number): void {
    this._state.update(state => ({
      ...state,
      isLoading: true,
      error: null,
    }));

    this.http.get<Requirement>(`${this.REQUIREMENT_URL}/${id}`)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: Requirement) => {
          this._state.update(state => ({
            ...state,
            currentRequirement: response,
            isLoading: false,
            error: null
          }));
        },
        error: (error: Error) => {
          console.error('Error fetching requirement by ID:', error);
          this._state.update(state => ({
            ...state,
            isLoading: false,
            error: error.message
          }));
        }
      })
  }

  public createRequirement(requirement: CreateRequirementDto): void {
    this._state.update(state => ({
      ...state,
      isLoading: true,
      error: null,
    }));
    this.http.post<Requirement>(this.REQUIREMENT_URL, requirement)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: Requirement) => {
          console.log('Created requirement:', response);
          this._state.update(state => ({
            ...state,
            requirements: [...state.requirements, response],
            currentRequirement: response,
            isLoading: false,
            error: null
          }));
        },
        error: (error: Error) => {
          console.error('Error creating requirement:', error);
          this._state.update(state => ({
            ...state,
            isLoading: false,
            error: error.message
          }));
        }
      })
  }

  public updateRequirement(id: number, newRequirement: UpdateRequirementDto): void {
    this._state.update(state => ({
      ...state,
      isLoading: true,
      error: null,
    }));
    this.http.put<Requirement>(`${this.REQUIREMENT_URL}/${id}`, newRequirement)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: Requirement) => {
          console.log('Updated requirement:', response);
          this._state.update(state => {
            const updatedRequirements = state.requirements.map(req =>
              req.id === id ? response : req
            );
            return {
              ...state,
              requirements: updatedRequirements,
              currentRequirement: response,
              isLoading: false,
              error: null
            };
          });
        },
        error: (error: Error) => {
          console.error('Error updating requirement:', error);
          this._state.update(state => ({
            ...state,
            isLoading: false,
            error: error.message
          }));
        }
      })
  }

  public deleteRequirement(id: number): void {
    this._state.update(state => ({
      ...state,
      isLoading: true,
      error: null,
    }));
    this.http.delete(`${this.REQUIREMENT_URL}/${id}`)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this._state.update(state => ({
            ...state,
            requirements: state.requirements.filter(req => req.id !== id),
            currentRequirement: state.currentRequirement?.id === id
              ? null
              : state.currentRequirement,
            isLoading: false,
            error: null
          }));
        },
        error: (error: any) => {
          this._state.update(state => ({
            ...state,
            isLoading: false,
            error: error.message || 'Failed to delete requirement'
          }));
        }
      });

  }

  public reloadRequirements(): void {
    this.getAllRequirements();
  }

  public clearError(): void {
    this._state.update(state => ({
      ...state,
      error: null
    }));
  }

  public clearCurrentRequirement(): void {
    this._state.update(state => ({
      ...state,
      currentRequirement: null
    }));
  }
}
