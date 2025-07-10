import {computed, inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Requirement} from '../../../shared/models/requirement';

@Injectable({
  providedIn: 'root'
})
export class RequirementService {
  private readonly http = inject(HttpClient);

  private readonly _requirements: WritableSignal<Requirement[]> = signal([]);
  private readonly _isLoading: WritableSignal<boolean> = signal(false);
  private readonly _isFilterByHighPriority: WritableSignal<boolean> = signal(true);

  public readonly requirements: Signal<Requirement[]> = this._requirements.asReadonly();
  public readonly isLoading: Signal<boolean> = this._isLoading.asReadonly();
  public readonly isFilterByHighPriority: Signal<boolean> = this._isFilterByHighPriority.asReadonly();

  public readonly sortedByNewest: Signal<Requirement[]> = computed(() => {
    const requirements = this.requirements();
    if (!requirements) {
      return [];
    }
    return requirements.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  })
  public readonly sortedByAlphabet: Signal<Requirement[]> = computed(() => {
    const requirements = this.requirements();
    if (!requirements) {
      return [];
    }

    return requirements.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
  });
  public readonly sortedByPriority: Signal<Requirement[]> = computed(() => {
    const requirements = this.requirements();
    const isPriorityHigh = this.isFilterByHighPriority();
    if (!requirements) {
      return [];
    }

    return requirements.sort((a, b) => {
      const priorityOrder = {LOW: 1, MEDIUM: 2, HIGH: 3};
      if (isPriorityHigh) {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      } else {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
    });
  });

  constructor() {
  }

  public fetchRequirements(): void {
    this._isLoading.set(true);
    this.http.get<Requirement[]>('api/requirements').subscribe({
      next: (response) => {
        console.log(response);
        this._requirements.set(response);
        this._isLoading.set(false);
      },
      error: (error: Error) => {
        console.error('Error fetching requirements:', error);
        this._requirements.set([]);
        this._isLoading.set(false);
      }
    })
  }

  public fetchRequirementById(id: number): void {
    
  }
}
