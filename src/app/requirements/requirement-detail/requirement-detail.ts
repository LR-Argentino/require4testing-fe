import {Component, computed, inject, OnInit} from '@angular/core';
import {RequirementService} from '../../core/services/requirement-service';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-requirement-detail',
  imports: [
    DatePipe
  ],
  templateUrl: './requirement-detail.html',
  styleUrl: './requirement-detail.css'
})
export class RequirementDetail implements OnInit {
  protected readonly requirementsService = inject(RequirementService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  requirementId = computed(() => {
    const id = this.route.snapshot.paramMap.get('id');
    return id ? Number(id) : 0;
  });

  ngOnInit(): void {
    this.requirementsService.getRequirementById(this.requirementId());
  }

  protected retryLoad(): void {
    this.requirementsService.getRequirementById(this.requirementId());
  }

  protected clearError(): void {
    this.requirementsService.clearError();
  }

  protected deleteRequirement(): void {
    this.requirementsService.deleteRequirement(this.requirementId());
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
}
