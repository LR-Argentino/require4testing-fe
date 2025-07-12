import {computed, inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Requirement} from '../../requirements/models/requirement';
import { CreateRequirementDto, UpdateRequirementDto } from '../../requirements/models/create-update-requirement-dto';

@Injectable({
  providedIn: 'root'
})
export class RequirementService {
  private readonly http = inject(HttpClient);

  private readonly REQUIREMENT_URL = 'api/requirements';

  private readonly _requirements: WritableSignal<Requirement[]> = signal([]);
  private readonly _isLoading: WritableSignal<boolean> = signal(false);
  private readonly _isFilterByHighPriority: WritableSignal<boolean> = signal(true);
  private readonly _error: WritableSignal<string | null> = signal(null);

  public readonly requirements: Signal<Requirement[]> = this._requirements.asReadonly();
  public readonly isLoading: Signal<boolean> = this._isLoading.asReadonly();
  public readonly isFilterByHighPriority: Signal<boolean> = this._isFilterByHighPriority.asReadonly();
  public readonly error: Signal<string | null> = this._error.asReadonly();

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
  // public readonly sortedByPriority: Signal<Requirement[]> = computed(() => {
  //   const requirements = this.requirements();
  //   const isPriorityHigh = this.isFilterByHighPriority();
  //   if (!requirements) {
  //     return [];
  //   }
  //
  //   return requirements.sort((a, b) => {
  //     const priorityOrder = {LOW: "C", MEDIUM: "B", HIGH: "A"};
  //     if (isPriorityHigh) {
  //       return priorityOrder[b.priority] - priorityOrder[a.priority];
  //     } else {
  //       return priorityOrder[a.priority] - priorityOrder[b.priority];
  //     }
  //   });
  // });

  constructor() {
  }

  public getAllRequirements(): void {
    this._isLoading.set(true);
    this.http.get<Requirement[]>(this.REQUIREMENT_URL).subscribe({
      next: (response) => {
        this._requirements.set(response);
        this._isLoading.set(false);
      },
      error: (error: Error) => {
        console.error('Error fetching requirements:', error);
        this._error.set(error.message);
        this._requirements.set([]);
        this._isLoading.set(false);
      }
    })
  }

  public getRequirementById(id: number): void {
    this._isLoading.set(true);
    this.http.get<Requirement>(`${this.REQUIREMENT_URL}/${id}`).subscribe({
      next: (response: Requirement) => {
        this._isLoading.set(false);
      },
      error: (error: Error) => {
        console.error('Error fetching requirement by ID:', error);
        this._error.set(error.message);
        this._isLoading.set(false);
      }
    })
  }

  public createRequirement(requirement: CreateRequirementDto): void {
    this._isLoading.set(true);
    this.http.post<Requirement>(this.REQUIREMENT_URL, requirement).subscribe({
      next: (response: Requirement) => {
        console.log('Created requirement:', response);
        this._requirements.update(reqs => [...reqs, response]);
        this._isLoading.set(false);
      },
      error: (error: Error) => {
        console.error('Error creating requirement:', error);
        this._error.set(error.message);
        this._isLoading.set(false);
      }
    });
  }

  public updateRequirement(id: number, newRequirement: UpdateRequirementDto): void {
    this._isLoading.set(true);
    this.http.put<Requirement>(`${this.REQUIREMENT_URL}/${id}`, newRequirement).subscribe({
      next: (response: Requirement) => {
        console.log('Updated requirement:', response);
        this._requirements.update(reqs => reqs.map(req => req.id === id ? response : req));
        this._isLoading.set(false);
      },
      error: (error: Error) => {
        console.error('Error updating requirement:', error);
        this._isLoading.set(false);
      }
    });
  }

  public deleteRequirement(id: number): void {
    this._isLoading.set(true);
    this.http.delete(`${this.REQUIREMENT_URL}/${id}`).subscribe({
      next: () => {
        this._requirements.update(reqs => reqs.filter(req => req.id !== id));
        this._isLoading.set(false);
      },
      error: (error: Error) => {
        console.error('Error deleting requirement:', error);
        this._isLoading.set(false);
      }
    })
  }
}
