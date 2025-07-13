import {computed, inject, Injectable, Signal, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Requirement} from '../../requirements/models/requirement';
import {RequirementsState} from '../../requirements/models/requirements-state';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {CreateRequirementDto, UpdateRequirementDto} from '../../requirements/models/create-update-requirement-dto';

@Injectable({
  providedIn: 'root'
})
export class RequirementService {
  private readonly http = inject(HttpClient);

  private readonly REQUIREMENT_URL = 'api/requirements';

  private _state = signal<RequirementsState>({
    requirements: [],
    currentRequirement: null,
    isLoading: false,
    error: null
  });

  public readonly requirements: Signal<Requirement[]> = computed(() => this._state().requirements);
  public readonly currentRequirement: Signal<Requirement | null> = computed(() => this._state().currentRequirement);
  public readonly isLoading: Signal<boolean> = computed(() => this._state().isLoading);
  public readonly error: Signal<string | null> = computed(() => this._state().error);

  public getAllRequirements(): void {
    this._state.update(state => ({
      ...state,
      isLoading: true,
      error: null
    }));

    this.http.get<Requirement[]>(this.REQUIREMENT_URL)
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (response: Requirement[]) => {
          this._state.update(state => ({
            ...state,
            requirements: response,
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
      .pipe(takeUntilDestroyed())
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
      .pipe(takeUntilDestroyed())
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
      .pipe(takeUntilDestroyed())
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
      .pipe(takeUntilDestroyed())
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
}
