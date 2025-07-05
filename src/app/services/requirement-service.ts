import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Requirement} from '../models/requirement';

@Injectable({
  providedIn: 'root'
})
export class RequirementService {
  private API_URL: string = 'api/requirements';
  private http: HttpClient = inject(HttpClient);

  private _requirements: WritableSignal<Requirement[]> = signal([]);


  constructor() {
  }

  getRequirements(): void {
    this.http.get<Requirement[]>(this.API_URL).subscribe((res) => {
      this._requirements.set(res);
    })
  }
}
