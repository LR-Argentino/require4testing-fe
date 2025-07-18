import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Requirement} from '../../../shared/models/requirement';

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
}

