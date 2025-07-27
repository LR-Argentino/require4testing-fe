import {Component, inject, OnInit} from '@angular/core';
import {Priority} from '../../../shared/enums/priority';
import {Status} from '../../../shared/enums/status';
import {NgClass} from '@angular/common';
import {TestCase} from '../../../shared/models/test-case';
import {TestCaseService} from '../../../core/services/test-case-service';
import {getStatusClasses, getStatusColor, getStatusLabel} from '../../../utils';
import {CreateTestCase} from '../create-test-case/create-test-case';

@Component({
  selector: 'app-requirement-table',
  imports: [
    NgClass,
    CreateTestCase,

  ],
  templateUrl: './test-case-table.html',
  styleUrl: './test-case-table.css'
})
export class TestCaseTable implements OnInit {
  protected readonly getStatusLabel = getStatusLabel;
  protected readonly getStatusClasses = getStatusClasses;
  protected readonly getStatusColor = getStatusColor;

  protected readonly testCaseService = inject(TestCaseService);
  protected modalVisible = false;

  protected Priority = Priority;
  protected Status = Status;

  protected isDrawerOpen = false;
  protected selectedTestCase: TestCase | null = null;


  ngOnInit(): void {
    this.testCaseService.getTestCases();
  }


  openRequirementDrawer(testCase: TestCase): void {
    this.selectedTestCase = testCase;
    this.isDrawerOpen = true;
  }
}
