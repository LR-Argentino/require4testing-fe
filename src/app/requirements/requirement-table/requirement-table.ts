import {Component, inject, OnInit} from '@angular/core';
import {Priority} from '../../../shared/enums/priority';
import {Status} from '../../../shared/enums/status';
import {DatePipe, NgClass} from '@angular/common';
import {RequirementDetail} from '../requirement-detail/requirement-detail';
import {RequirementService} from '../../../core/services/requirement-service';
import {RequirementUserBatchDto} from '../../../shared/models/requirement-user-batch-dto';
import {CreateRequirement} from '../create-requirement/create-requirement';

@Component({
  selector: 'app-requirement-table',
  imports: [
    NgClass,
    RequirementDetail,
    DatePipe,
    CreateRequirement
  ],
  templateUrl: './requirement-table.html',
  styleUrl: './requirement-table.css'
})
export class RequirementTable implements OnInit {
  protected readonly requirementService = inject(RequirementService);
  protected modalVisible = false;

  protected Priority = Priority;
  protected Status = Status;

  protected isDrawerOpen = false;
  protected selectedRequirement: RequirementUserBatchDto | null = null;


  ngOnInit(): void {
    this.requirementService.getRequirements();
  }


  openRequirementDrawer(requirement: RequirementUserBatchDto): void {
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

  getUserInitials(username: string): string {
    return username
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  closeModal() {
    this.modalVisible = false;
  }
}
