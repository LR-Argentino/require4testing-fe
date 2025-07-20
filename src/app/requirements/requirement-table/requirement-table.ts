import {Component, inject, OnInit} from '@angular/core';
import {Requirement} from '../../../shared/models/requirement';
import {Priority} from '../../../shared/enums/priority';
import {Status} from '../../../shared/enums/status';
import {DatePipe, NgClass} from '@angular/common';
import {RequirementDetail} from '../requirement-detail/requirement-detail';
import {RequirementService} from '../../../core/services/requirement-service';

@Component({
  selector: 'app-requirement-table',
  imports: [
    NgClass,
    RequirementDetail,
    DatePipe
  ],
  templateUrl: './requirement-table.html',
  styleUrl: './requirement-table.css'
})
export class RequirementTable implements OnInit {
  protected readonly requirementService = inject(RequirementService);

  Priority = Priority;
  Status = Status;

  // Drawer state
  isDrawerOpen = false;
  selectedRequirement: Requirement | null = null;

  // Mock users data
  private users = new Map([
    [1, {name: 'Adrian Bert', email: 'adrian@example.com'}],
    [2, {name: 'Anna Miller', email: 'anna@example.com'}],
    [3, {name: 'Tom Bradley', email: 'tom@example.com'}],
    [4, {name: 'Marcus Johnson', email: 'marcus@example.com'}],
    [5, {name: 'Sarah Wilson', email: 'sarah@example.com'}]
  ]);
  
  ngOnInit(): void {
    this.requirementService.getRequirements();
  }


  openRequirementDrawer(requirement: Requirement): void {
    this.selectedRequirement = requirement;
    this.isDrawerOpen = true;
  }

  closeDrawer(): void {
    this.isDrawerOpen = false;
    this.selectedRequirement = null;
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

  getStatusColor(status: Status): string {
    switch (status) {
      case Status.OPEN:
        return 'bg-blue-500';
      case Status.IN_PROGRESS:
        return 'bg-yellow-500';
      case Status.CLOSED:
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
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

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
