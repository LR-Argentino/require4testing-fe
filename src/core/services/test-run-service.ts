import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TestRun} from "../../shared/models/test-run";
import {catchError, finalize, of} from 'rxjs';


interface TestRunState {
  testRuns: TestRun[];
  isLoading?: boolean;
  error?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class TestRunService {
  private readonly BASE_URL = "/api/test-runs";
  private readonly http = inject(HttpClient);

  private readonly _state = signal<TestRunState>({
    testRuns: [],
    isLoading: false,
    error: null
  });

  public readonly testRuns = computed(() => this._state().testRuns);


  constructor() {
  }


  public getTestRuns(): void {
    this.setLoadingAndErrorStateTo(true);
    this.http.get<TestRun[]>(this.BASE_URL).pipe(
      catchError(error => {
        this.setLoadingAndErrorStateTo(false, error.message || 'Failed to load test runs');
        return of([]);
      }),
      finalize(() => {
        this.setLoadingAndErrorStateTo(false);
      })
    ).subscribe({
      next: (testRuns: TestRun[]) => {
        console.log(testRuns);
        this._state.update(state => ({
          ...state,
          testRuns: testRuns,
          error: null
        }));
      }
    });
  }

  private setLoadingAndErrorStateTo(isLoading: boolean, errorMessage: string | null = null): void {
    this._state.update(state => ({
      ...state,
      isLoading: isLoading,
      error: errorMessage
    }))
  }

}
