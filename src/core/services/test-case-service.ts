import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TestCase} from '../../shared/models/test-case';

interface TestCaseState {
  testCases: TestCase[];
  loading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class TestCaseService {
  private readonly http = inject(HttpClient);
  private readonly BASE_URL = '/api/test-cases';

  private readonly _state = signal<TestCaseState>({
    testCases: [],
    loading: false,
    error: null
  });

  public readonly testCases = computed(() => this._state().testCases);

  constructor() {
  }

  public getTestCases(): void {
    this.setLoadingAndErrorStateTo(true);
    this.http.get<TestCase[]>(this.BASE_URL).subscribe({
      next: (testCases) => {
        this._state.update(state => ({
          ...state,
          testCases: testCases,
          loading: false,
          error: null
        }));
        console.log('Test cases loaded:', testCases);
      },
      error: (error) => {
        this.setLoadingAndErrorStateTo(false, error.message || 'Failed to load test cases');
      }
    });
  }

  private setLoadingAndErrorStateTo(isLoading: boolean, errorMessage: string | null = null): void {
    this._state.update(state => ({
      ...state,
      isLoading: isLoading,
      error: errorMessage
    }));
  }
}
