import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {RequirementService} from '../../core/services/requirement-service';
import {ActivatedRoute, Router} from '@angular/router';
import {TestCaseService} from '../../core/services/test-case-service';
import {Requirement} from '../models/requirement';
import {DatePipe, NgClass} from '@angular/common';
import {firstValueFrom} from 'rxjs';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-requirement-detail',
  imports: [
    DatePipe,
    NgClass,
    FormsModule
  ],
  templateUrl: './requirement-detail.html',
  styleUrl: './requirement-detail.css'
})
export class RequirementDetail implements OnInit {
  protected readonly requirementsService = inject(RequirementService);
  protected readonly testCaseService = inject(TestCaseService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private readonly _requirement = signal<Requirement | null>(null);
  private readonly _isEditing = signal<boolean>(false);

  protected readonly requirement = this._requirement.asReadonly();
  protected readonly isEditing = this._isEditing.asReadonly();

  constructor() {
    const navigation = this.router.getCurrentNavigation();
    const req = navigation?.extras.state?.['requirement'][0];
    console.log(req);
    this._requirement.set(req || null);
  }

  requirementId = computed(() => {
    const id = this.route.snapshot.paramMap.get('id');
    return id ? Number(id) : 0;
  });

  async ngOnInit(): Promise<void> {
    const req = await firstValueFrom(this.requirementsService.getRequirementById(this.requirementId()))
    this._requirement.set(req);
    this.testCaseService.fetchTestCasesByRequirementId(this.requirementId());
  }

  protected retryLoad(): void {
    this.requirementsService.getRequirementById(this.requirementId());
  }

  protected clearError(): void {
    // this.requirementsService.clearError();
  }

  protected async deleteRequirement(): Promise<void> {
    await firstValueFrom(this.requirementsService.deleteRequirement(this.requirementId()));
    this.router.navigate(['/requirements/list']);
  }

  protected editRequirement(): void {
    this._isEditing.set(!this.isEditing());
    // const req = this.requirementsService.currentRequirement();
    // if (req) {
    //   this.router.navigate(['/requirements', req.id, 'edit']);
    // }
  }

  protected goBack(): void {
    // this.requirementsService.clearCurrentRequirement();
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
