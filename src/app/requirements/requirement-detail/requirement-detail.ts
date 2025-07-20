import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DatePipe, NgClass} from '@angular/common';
import {Requirement} from '../../../shared/models/requirement';
import {TestCase} from '../../../shared/models/test-case';
import {Status} from '../../../shared/enums/status';
import {TestResult} from '../../../shared/enums/test-result';
import {Priority} from '../../../shared/enums/priority';

@Component({
  selector: 'app-requirement-detail',
  imports: [
    NgClass,
    DatePipe
  ],
  templateUrl: './requirement-detail.html',
  styleUrl: './requirement-detail.css'
})
export class RequirementDetail {
  @Input() isOpen: boolean = false;
  @Input() requirement: Requirement | null = null;
  @Output() closeDrawerEvent = new EventEmitter<void>();

  activeTab: 'testcases' | 'activity' = 'testcases';

  // Mock users data
  private users = new Map([
    [1, {name: 'Adrian Bert', email: 'adrian@example.com'}],
    [2, {name: 'Anna Miller', email: 'anna@example.com'}],
    [3, {name: 'Tom Bradley', email: 'tom@example.com'}],
    [4, {name: 'Marcus Johnson', email: 'marcus@example.com'}],
    [5, {name: 'Sarah Wilson', email: 'sarah@example.com'}]
  ]);

  // Mock test cases data
  private testCases: TestCase[] = [
    {
      id: 1,
      title: 'Login with valid credentials',
      description: 'Test user login functionality with correct username and password',
      requirementId: 1,
      status: Status.IN_PROGRESS,
      testResult: TestResult.PASSED,
      createdBy: 2,
      updatedAt: '2024-02-12',
      creationDate: '2024-02-01',
      testRun: []
    },
    {
      id: 2,
      title: 'Login with invalid credentials',
      description: 'Test user login functionality with incorrect credentials',
      requirementId: 1,
      status: Status.OPEN,
      testResult: null,
      createdBy: 3,
      updatedAt: '2024-02-10',
      creationDate: '2024-02-01',
      testRun: []
    },
    {
      id: 3,
      title: 'Password reset functionality',
      description: 'Test password reset workflow via email',
      requirementId: 1,
      status: Status.CLOSED,
      testResult: TestResult.PASSED,
      createdBy: 1,
      updatedAt: '2024-02-08',
      creationDate: '2024-02-01',
      testRun: []
    },
    {
      id: 4,
      title: 'Dashboard data visualization',
      description: 'Test real-time data display on dashboard',
      requirementId: 2,
      status: Status.IN_PROGRESS,
      testResult: TestResult.FAILED,
      createdBy: 4,
      updatedAt: '2024-02-11',
      creationDate: '2024-02-03',
      testRun: []
    },
    {
      id: 5,
      title: 'Export report functionality',
      description: 'Test PDF and CSV export features',
      requirementId: 2,
      status: Status.OPEN,
      testResult: null,
      createdBy: 2,
      updatedAt: '2024-02-09',
      creationDate: '2024-02-03',
      testRun: []
    }
  ];

  closeDrawer(): void {
    this.closeDrawerEvent.emit();
  }

  getTestCasesForRequirement(): TestCase[] {
    if (!this.requirement) return [];
    return this.testCases.filter(tc => tc.requirementId === this.requirement!.id);
  }

  getPriorityClasses(priority: Priority): string {
    switch (priority) {
      case Priority.HIGH:
        return 'bg-red-100 text-red-800';
      case Priority.MEDIUM:
        return 'bg-yellow-100 text-yellow-800';
      case Priority.LOW:
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusClasses(status: Status): string {
    switch (status) {
      case Status.OPEN:
        return 'bg-blue-100 text-blue-800';
      case Status.IN_PROGRESS:
        return 'bg-yellow-100 text-yellow-800';
      case Status.CLOSED:
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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

  getPriorityLabel(priority: Priority): string {
    switch (priority) {
      case Priority.HIGH:
        return 'High';
      case Priority.MEDIUM:
        return 'Medium';
      case Priority.LOW:
        return 'Low';
      default:
        return priority;
    }
  }

  getStatusLabel(status: Status): string {
    switch (status) {
      case Status.OPEN:
        return 'Open';
      case Status.IN_PROGRESS:
        return 'In Research';
      case Status.CLOSED:
        return 'Closed';
      default:
        return status;
    }
  }

  getUserName(userId: number): string {
    return this.users.get(userId)?.name || `User ${userId}`;
  }

  getUserInitials(userId: number): string {
    const userName = this.getUserName(userId);
    return userName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}
