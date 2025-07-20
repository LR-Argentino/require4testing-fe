import {Component} from '@angular/core';
import {Requirement} from '../../../shared/models/requirement';
import {Priority} from '../../../shared/enums/priority';
import {Status} from '../../../shared/enums/status';
import {NgClass} from '@angular/common';
import {RequirementDetail} from '../requirement-detail/requirement-detail';

@Component({
  selector: 'app-requirement-table',
  imports: [
    NgClass,
    RequirementDetail
  ],
  templateUrl: './requirement-table.html',
  styleUrl: './requirement-table.css'
})
export class RequirementTable {
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

  requirements: Requirement[] = [
    {
      id: 1,
      title: 'User Authentication System',
      description: 'Implement comprehensive user authentication with login, registration, and password reset functionality',
      priority: Priority.HIGH,
      status: Status.IN_PROGRESS,
      createdBy: 1,
      updatedAt: new Date('2024-02-12'),
      createdAt: new Date('2024-02-01')
    },
    {
      id: 2,
      title: 'Dashboard Analytics',
      description: 'Create interactive dashboard with real-time analytics and reporting capabilities',
      priority: Priority.HIGH,
      status: Status.IN_PROGRESS,
      createdBy: 2,
      updatedAt: new Date('2024-02-12'),
      createdAt: new Date('2024-02-02')
    },
    {
      id: 3,
      title: 'Mobile Responsive Design',
      description: 'Ensure all pages are fully responsive and optimized for mobile devices',
      priority: Priority.HIGH,
      status: Status.OPEN,
      createdBy: 3,
      updatedAt: new Date('2024-02-12'),
      createdAt: new Date('2024-02-03')
    },
    {
      id: 4,
      title: 'Email Notification System',
      description: 'Implement automated email notifications for important system events and user actions',
      priority: Priority.MEDIUM,
      status: Status.OPEN,
      createdBy: 2,
      updatedAt: new Date('2024-02-12'),
      createdAt: new Date('2024-02-04')
    },
    {
      id: 5,
      title: 'API Documentation',
      description: 'Create comprehensive API documentation with examples and integration guides',
      priority: Priority.LOW,
      status: Status.OPEN,
      createdBy: 4,
      updatedAt: new Date('2024-02-14'),
      createdAt: new Date('2024-02-05')
    },
    {
      id: 6,
      title: 'Data Export Functionality',
      description: 'Allow users to export data in various formats (CSV, PDF, Excel)',
      priority: Priority.LOW,
      status: Status.CLOSED,
      createdBy: 3,
      updatedAt: new Date('2024-02-14'),
      createdAt: new Date('2024-02-06')
    },
    {
      id: 7,
      title: 'Search and Filter System',
      description: 'Implement advanced search and filtering capabilities across all data tables',
      priority: Priority.MEDIUM,
      status: Status.IN_PROGRESS,
      createdBy: 5,
      updatedAt: new Date('2024-02-14'),
      createdAt: new Date('2024-02-07')
    },
    {
      id: 8,
      title: 'User Role Management',
      description: 'Create role-based access control system with different permission levels',
      priority: Priority.HIGH,
      status: Status.CLOSED,
      createdBy: 1,
      updatedAt: new Date('2024-02-08'),
      createdAt: new Date('2024-01-15')
    }
  ];

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
