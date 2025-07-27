import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {DatePipe, NgClass} from '@angular/common';
import {TestCase} from '../../../shared/models/test-case';
import {RequirementUserBatchDto} from '../../../shared/models/requirement-user-batch-dto';
import {getPriorityClasses, getPriorityLabel, getStatusClasses, getStatusLabel} from '../../../utils';
import {Status} from '../../../shared/enums/status';
import {TestResult} from '../../../shared/enums/test-result';
import {TestCaseService} from '../../../core/services/test-case-service';

@Component({
  selector: 'app-requirement-detail',
  imports: [
    NgClass,
    DatePipe
  ],
  templateUrl: './requirement-detail.html',
  styleUrl: './requirement-detail.css'
})
export class RequirementDetail implements OnInit {
  @Input() isOpen: boolean = false;
  @Input() requirement: RequirementUserBatchDto | null = null;
  @Output() closeDrawerEvent = new EventEmitter<void>();

  protected readonly testCaseService = inject(TestCaseService);

  protected readonly getStatusClasses = getStatusClasses;
  protected readonly getStatusLabel = getStatusLabel;
  protected readonly getPriorityClasses = getPriorityClasses;
  protected readonly getPriorityLabel = getPriorityLabel;


  activeTab: 'testcases' | 'activity' = 'testcases';

  closeDrawer(): void {
    this.closeDrawerEvent.emit();
  }

  ngOnInit(): void {
    this.testCaseService.getTestCases();
  }


  getTestCasesForRequirement(): TestCase[] {
    if (!this.requirement) return [];
    return this.testCaseService.testCases().filter(tc => tc.requirementId === this.requirement!.id);
  }

  getTestCaseStatusClasses(status: Status): string {
    switch (status) {
      case Status.OPEN:
        return 'bg-blue-100 text-blue-700';
      case Status.IN_PROGRESS:
        return 'bg-yellow-100 text-yellow-700';
      case Status.CLOSED:
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }

  getTestResultClasses(result: TestResult): string {
    switch (result) {
      case TestResult.PASSED:
        return 'bg-green-100 text-green-700';
      case TestResult.FAILED:
        return 'bg-red-100 text-red-700';
      case TestResult.BLOCKED:
        return 'bg-orange-100 text-orange-700';
      case TestResult.SKIPPED:
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }

}
