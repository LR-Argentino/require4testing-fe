import {Component, inject, OnInit} from '@angular/core';
import {Priority} from '../../../shared/enums/priority';
import {Status} from '../../../shared/enums/status';
import {DatePipe, NgClass} from '@angular/common';
import {RequirementDetail} from '../requirement-detail/requirement-detail';
import {RequirementService} from '../../../core/services/requirement-service';
import {RequirementUserBatchDto} from '../../../shared/models/requirement-user-batch-dto';
import {CreateRequirement} from '../create-requirement/create-requirement';
import {
  getPriorityClasses,
  getPriorityLabel,
  getStatusClasses,
  getStatusColor,
  getStatusLabel,
  getUserInitials
} from '../../../utils';

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
  protected readonly getUserInitials = getUserInitials;
  protected readonly getStatusLabel = getStatusLabel;
  protected readonly getStatusClasses = getStatusClasses;
  protected readonly getPriorityLabel = getPriorityLabel;
  protected readonly getPriorityClasses = getPriorityClasses;
  protected readonly getStatusColor = getStatusColor;
  
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

  closeModal() {
    this.modalVisible = false;
  }


}
