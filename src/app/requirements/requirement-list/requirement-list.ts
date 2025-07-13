import {Component, computed, inject, OnInit, Signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {RequirementService} from '../../core/services/requirement-service';
import {Requirement} from '../models/requirement';

@Component({
  selector: 'app-requirement-list',
  imports: [
    RouterLink
  ],
  templateUrl: './requirement-list.html',
  styleUrl: './requirement-list.css'
})
export class RequirementList implements OnInit {
  protected readonly requirementService = inject(RequirementService);

  protected readonly requirements: Signal<Requirement[]> = this.requirementService.requirements;
  protected readonly totalRequirements: Signal<number> = computed(() => this.requirements().length);
  protected readonly isLoading: Signal<boolean> = this.requirementService.isLoading;
  protected readonly error: Signal<string | null> = this.requirementService.error;

  ngOnInit(): void {
    this.loadRequirements();
  }

  protected viewRequirement(id: number): void {
    console.log(`Viewing requirement with ID: ${id}`);
    console.log(this.requirementService.getRequirementById(id));
    // TODO: Implement navigation to requirement detail
    // this.router.navigate(['/requirements', id]);
  }

  protected formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  protected getInitials(fullName: string): string {
    // TODO: Replace with actual user service call
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
