import {DestroyRef, inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Requirement} from '../../requirements/models/requirement';
import {CreateRequirementDto, UpdateRequirementDto} from '../../requirements/models/create-update-requirement-dto';
import {Observable} from 'rxjs';

interface RequirementsState {
  requirements: Requirement[];
  currentRequirement: Requirement | null;
  userIds: number[];
  isLoading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class RequirementService {
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);
  private readonly REQUIREMENT_URL = 'api/requirements';

  public fetchAllRequirements(): Observable<Requirement[]> {
    return this.http.get<Requirement[]>(this.REQUIREMENT_URL);
  }

  public getRequirementById(id: number): Observable<Requirement> {
    return this.http.get<Requirement>(`${this.REQUIREMENT_URL}/${id}`)
  }

  public createRequirement(requirement: CreateRequirementDto): Observable<Requirement> {
    return this.http.post<Requirement>(this.REQUIREMENT_URL, requirement);
  }

  public updateRequirement(id: number, newRequirement: UpdateRequirementDto): Observable<Requirement> {
    return this.http.put<Requirement>(`${this.REQUIREMENT_URL}/${id}`, newRequirement);
  }

  public deleteRequirement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.REQUIREMENT_URL}/${id}`)
  }
}
