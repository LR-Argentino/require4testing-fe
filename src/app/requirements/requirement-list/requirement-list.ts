import {Component, inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Requirement} from '../models/requirement';
import {PriorityLevel} from '../../../shared/enums/priority-level';
import {StatusLevel} from '../../../shared/enums/status-level';
import {RequirementService} from '../../core/services/requirement-service';

@Component({
  selector: 'app-requirement-list',
  imports: [
    RouterLink
  ],
  templateUrl: './requirement-list.html',
  styleUrl: './requirement-list.css'
})
export class RequirementList {
  protected readonly requirementService = inject(RequirementService);
  requirements: Requirement[] = [
    {
      id: 1,
      title: 'User Authentication',
      description: 'Implement user login and registration functionality.',
      priority: PriorityLevel.MEDIUM,
      status: StatusLevel.OPEN,
      createdBy: 1,
      createdAt: '2023-10-01T12:00:00Z',
      updatedAt: '2023-10-02T12:00:00Z'
    },
    {
      id: 2,
      title: 'Dashboard Overview',
      description: 'Create a dashboard to display user statistics.',
      priority: PriorityLevel.MEDIUM,
      status: StatusLevel.OPEN,
      createdBy: 2,
      createdAt: '2023-10-03T12:00:00Z',
      updatedAt: '2023-10-04T12:00:00Z'
    }
  ];
  totalRequirements = this.requirements.length;

  constructor() {
  }

  ngOnInit() {
    this.requirementService.getAllRequirements();
  }

  viewRequirement(id: number): void {
    console.log(`Viewing requirement with ID: ${id}`);
    // Hier würdest du zur Requirement-Detail Seite navigieren
    // this.router.navigate(['/requirements', id]);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  getInitials(fullName: string): string {
    // TODO: Call users api
    return fullName
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  protected loadRequirements(): void {
    this.requirementService.getAllRequirements();
  }
}
