import {Component, computed, inject, OnInit} from '@angular/core';
import {RequirementService} from '../../core/services/requirement-service';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe, NgClass} from '@angular/common';
import {TestCaseService} from '../../core/services/test-case-service';

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
  protected readonly requirementsService = inject(RequirementService);
  protected readonly testCaseService = inject(TestCaseService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);


  requirementId = computed(() => {
    const id = this.route.snapshot.paramMap.get('id');
    return id ? Number(id) : 0;
  });

  ngOnInit(): void {
    this.requirementsService.getRequirementById(this.requirementId());
    this.testCaseService.fetchTestCasesByRequirementId(this.requirementId());
  }

  protected retryLoad(): void {
    this.requirementsService.getRequirementById(this.requirementId());
  }

  protected clearError(): void {
    this.requirementsService.clearError();
  }

  protected deleteRequirement(): void {
    this.requirementsService.deleteRequirement(this.requirementId());
    this.router.navigate(['/requirements/list']);
  }

  protected editRequirement(): void {
    const req = this.requirementsService.currentRequirement();
    if (req) {
      this.router.navigate(['/requirements', req.id, 'edit']);
    }
  }

  protected goBack(): void {
    this.requirementsService.clearCurrentRequirement();
    this.router.navigate(['/requirements/list']);
  }

  protected getPriorityClass(priority: string): string {
    const classes = {
      'LOW': 'bg-gray-600 text-gray-100',
      'MEDIUM': 'bg-yellow-600 text-yellow-100',
      'HIGH': 'bg-red-600 text-red-100'
    };
    return classes[priority as keyof typeof classes] || 'bg-gray-600 text-gray-100';
  }

  protected getStatusClass(status: string): string {
    const classes = {
      'OPEN': 'bg-blue-600 text-blue-100',
      'IN_PROGRESS': 'bg-yellow-600 text-yellow-100',
      'CLOSED': 'bg-green-600 text-green-100'
    };
    return classes[status as keyof typeof classes] || 'bg-gray-600 text-gray-100';
  }

  protected getStatusLabel(status: string): string {
    const labels = {
      'OPEN': 'Open',
      'IN_PROGRESS': 'In Progress',
      'CLOSED': 'Closed'
    };
    return labels[status as keyof typeof labels] || status;
  }

  protected getTestResultClass(result: string): string {
    const classes = {
      'PASSED': 'bg-green-600 text-green-100',
      'FAILED': 'bg-red-600 text-red-100',
      'BLOCKED': 'bg-yellow-600 text-yellow-100',
      'SKIPPED': 'bg-gray-600 text-gray-100'
    };
    return classes[result as keyof typeof classes] || 'bg-gray-600 text-gray-100';
  }
}
