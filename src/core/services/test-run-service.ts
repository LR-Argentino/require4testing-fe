import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TestRun} from "../../shared/models/test-run";
import {catchError, finalize, of} from 'rxjs';
import {CreateTestRunDto} from '../../shared/models/create-test-run-dto';


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

  public getTestRunById(id: number): void {
    this.setLoadingAndErrorStateTo(true);
    this.http.get<TestRun[]>(`${this.BASE_URL}/${id}`).pipe(
      catchError(error => {
        this.setLoadingAndErrorStateTo(false, error.message || 'Failed to load test runs for tester');
        return of([]);
      }),
      finalize(() => {
        this.setLoadingAndErrorStateTo(false);
      })
    ).subscribe({
      next: (testRuns: TestRun[]) => {
        console.log(`Test runs for tester ${id}:`, testRuns);
        this._state.update(state => ({
          ...state,
          testRuns: testRuns,
          error: null
        }));
      }
    });
  }

  public getTestRunsByUserId(): void {
    this.setLoadingAndErrorStateTo(true);
    this.http.get<TestRun[]>(`${this.BASE_URL}/user/`).pipe(
      catchError(error => {
        this.setLoadingAndErrorStateTo(false, error.message || 'Failed to load test runs for user');
        return of([]);
      }),
      finalize(() => {
        this.setLoadingAndErrorStateTo(false);
      })
    ).subscribe({
      next: (testRuns: TestRun[]) => {
        console.log(`Test runs for user:`, testRuns);
        this._state.update(state => ({
          ...state,
          testRuns: testRuns,
          error: null
        }));
      }
    });
  }

  public createTestRun(testRunDto: CreateTestRunDto, userId: number): void {
    this.setLoadingAndErrorStateTo(true);
    this.http.post<TestRun>(`${this.BASE_URL}/${userId}`, testRunDto).pipe(
      catchError(error => {
        this.setLoadingAndErrorStateTo(false, error.message || 'Failed to create test run');
        return of(null);
      }),
      finalize(() => {
        this.setLoadingAndErrorStateTo(false);
      })
    ).subscribe({
      next: (testRun: TestRun | null) => {
        if (testRun) {
          console.log('Test run created:', testRun);
          this._state.update(state => ({
            ...state,
            testRuns: [...state.testRuns, testRun],
            error: null
          }));
        }
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
