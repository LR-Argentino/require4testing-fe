import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TestCase} from '../../shared/models/test-case';
import {CreateTestCaseDto} from '../../shared/models/create-test-case-dto';
import {Status} from '../../shared/enums/status';

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
  public readonly openTestCases = computed(() => this._state().testCases.filter(testCase => testCase.status !== Status.CLOSED));

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
      },
      error: (error) => {
        this.setLoadingAndErrorStateTo(false, error.message || 'Failed to load test cases');
      }
    });
  }

  public createTestCase(testCase: CreateTestCaseDto): void {
    this.setLoadingAndErrorStateTo(true);
    this.http.post<TestCase>(this.BASE_URL, testCase).subscribe({
      next: (createdTestCase) => {
        this._state.update(state => ({
          ...state,
          testCases: [...state.testCases, createdTestCase],
          loading: false,
          error: null
        }));
      },
      error: (error) => {
        this.setLoadingAndErrorStateTo(false, error.message || 'Failed to create test case');
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
