import {Component, inject, OnInit} from '@angular/core';
import {TestRunService} from '../../../core/services/test-run-service';
import {TestCaseService} from '../../../core/services/test-case-service';
import {DatePipe} from '@angular/common';
import {TestRunStatus} from '../../../shared/enums/test-run-status';
import {CreateTestRun} from '../create-test-run/create-test-run';

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

  protected closeModal() {
    this.modalVisible = false;
  }
}
