import {computed, DestroyRef, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TestCase} from '../../test-cases/model/test-case';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

interface TestCaseState {
  testCases: TestCase[];
  isLoading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class TestCaseService {
  private readonly URL = '/api/test-cases'
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);

  private _state = signal<TestCaseState>({
    testCases: [],
    isLoading: false,
    error: null
  });

  public readonly testCases = computed(() => this._state().testCases);
  // public readonly testCasesLength = computed(() => this._state().testCases.length);
  public readonly error = computed(() => this._state().error);
  public readonly isLoading = computed(() => this._state().isLoading);

  constructor() {
  }


  public fetchTestCasesByRequirementId(requirementId: number) {
    this._state.update(state => ({
      ...state,
      isLoading: true,
      error: null
    }));
    return this.http.get<TestCase[]>(`${this.URL}/requirement/${requirementId}`)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (testCases: TestCase[]) => {
          console.log('Fetched test cases:', testCases);
          this._state.update(state => ({
            ...state,
            testCases: testCases === null ? [] : testCases,
            isLoading: false,
            error: null
          }));
        },
        error: (error: Error) => {
          this._state.update(state => ({
            ...state,
            testCases: [],
            isLoading: false,
            error: error.message
          }));
          console.error('Error fetching test cases:', error);
        }
      })
  }
}
