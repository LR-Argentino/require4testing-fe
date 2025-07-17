import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {RequirementService} from '../../core/services/requirement-service';
import {Requirement} from '../models/requirement';
import {UserService} from '../../core/services/user-service';
import {firstValueFrom} from 'rxjs';
import {User} from '../../../shared/models/user';

@Component({
  selector: 'app-requirement-list',
  imports: [
    RouterLink
  ],
  templateUrl: './requirement-list.html',
  styleUrl: './requirement-list.css'
})
export class RequirementList implements OnInit {
  private readonly requirementService = inject(RequirementService);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);


  private _users = signal<Map<number, User>>(new Map<number, User>());
  private _requirements = signal<Requirement[]>([]);
  private _isLoading = signal<boolean>(false);
  private _error = signal<string | null>(null);

  protected isLoading = this._isLoading.asReadonly();
  protected requirements = this._requirements.asReadonly();
  protected error = this._error.asReadonly();

  requirementsWithUsers = computed(() => {
    const reqs = this._requirements();
    const userMap = this._users();

    return reqs.map(requirement => ({
      ...requirement,
      createdByUser: userMap.get(requirement.createdBy) || null
    }));
  });

  ngOnInit(): void {
    this.loadData();
  }


  private async loadData(): Promise<void> {
    this._isLoading.set(true);
    this._error.set(null);
    try {
      const requirements = await firstValueFrom(this.requirementService.fetchAllRequirements());
      this._requirements.set(requirements || []);

      if (requirements && requirements.length > 0) {
        const userIds = [...new Set(requirements.map(req => req.createdBy))];
        const userMap = await firstValueFrom(this.userService.getUsersByIds(userIds));

        this._users.set(userMap || new Map());

      }
      this._isLoading.set(false);

    } catch (error) {
      console.error('Error loading requirements:', error);
      this._error.set('An error occurred while loading requirements.');
    } finally {
      this._isLoading.set(false);
    }
  }

  protected loadRequirements(): void {
    this.loadData();
  }

  protected formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  protected viewRequirement(id: number): void {
    console.log(`Viewing requirement with ID: ${id}`);
    const currentReq = this.requirements().filter(requirement => requirement.id === id);

    if (currentReq) {
      console.log(currentReq);
      this.router.navigate(['/requirements', id],
        {state: {requirement: currentReq}}
      );
    }
  }
}
