import {Component, inject, OnInit} from '@angular/core';
import {TestRun} from '../../../shared/models/test-run';
import {TestRunService} from '../../../core/services/test-run-service';
import {CreateTestRunDto} from '../../../shared/models/create-test-run-dto';
import {TestCaseService} from '../../../core/services/test-case-service';
import {DatePipe} from '@angular/common';
import {TestRunStatus} from '../../../shared/enums/test-run-status';
import {CreateTestRun} from '../create-test-run/create-test-run';

interface TestRunState {
  testRuns: TestRun[];
  isLoading: boolean;
  error: string | null;
}

@Component({
  selector: 'app-test-run-table',
  imports: [
    DatePipe,
    CreateTestRun
  ],
  templateUrl: './test-run-table.html',
  styleUrl: './test-run-table.css'
})
export class TestRunTable implements OnInit {
  protected readonly testRunService = inject(TestRunService);
  private readonly testCaseService = inject(TestCaseService);
  protected modalVisible = false;
  protected readonly TestRunStatus = TestRunStatus;

  ngOnInit(): void {
    this.testCaseService.getTestCases();
    this.testRunService.getTestRunsByUserId()
  }

  createTestRun(): void {
    console.log(this.testCaseService.openTestCases())
    const newTestRun: CreateTestRunDto = {
      title: 'New Test Run',
      description: 'Description of the new test run',
      startDate: new Date(new Date().getTime() + 15600000),
      endDate: new Date(new Date().getTime() + 27600000), // 1 hour later
      testCaseIds: [1, 2]
    }

    // this.testRunService.createTestRun(newTestRun);
  }

  closeModal() {
    this.modalVisible = false;
  }
}
