import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UpdateTestResultDto} from '../../shared/models/update-test-result-dto';
import {TestExecution} from '../../shared/models/test-execution';


@Injectable({providedIn: 'root'})
export class TestExecutionService {
  private readonly http = inject(HttpClient);
  private baseUrl = '/api/test-executions';

  assignTestCase(testRunId: number, testCaseId: number, testerId: number): Observable<TestExecution> {
    return this.http.post<TestExecution>(`${this.baseUrl}/runs/${testRunId}/cases/${testCaseId}/assign/${testerId}`, {});
  }

  submitTestResult(executionId: number, dto: UpdateTestResultDto): Observable<TestExecution> {
    return this.http.put<TestExecution>(`${this.baseUrl}/${executionId}/result`, dto);
  }

  getAssignedExecutions(): Observable<TestExecution[]> {
    this.http.get<TestExecution[]>(`${this.baseUrl}/assigned`).subscribe((res) => {
      console.log('Assigned Test Executions:', res);
    })
    return this.http.get<TestExecution[]>(`${this.baseUrl}/assigned`);
  }
}
