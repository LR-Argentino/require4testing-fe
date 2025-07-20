import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Requirement} from '../../shared/models/requirement';

interface RequirementState {
  error: string | null;
  isLoading: boolean;
  requirements: Requirement[];
}

@Injectable({
  providedIn: 'root'
})
export class RequirementService {
  private readonly BASE_URL = "/api/requirements";
  private readonly http = inject(HttpClient);

  private _state = signal<RequirementState>({
    error: null,
    isLoading: false,
    requirements: []
  });

  public readonly requirements = computed(() => this._state().requirements);

  constructor() {
  }

  public getRequirements(): void {
    this._state.update(state => ({...state, isLoading: true, error: null}));

    this.http.get<Requirement[]>(this.BASE_URL).subscribe({
      next: (requirements) => {
        this._state.update(state => ({
          ...state,
          requirements,
          isLoading: false,
          error: null
        }));

        console.log('Requirements loaded:', requirements);
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

