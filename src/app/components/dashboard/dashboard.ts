import {Component, inject} from '@angular/core';
import {Navbar} from '../navbar/navbar';
import {RequirementService} from '../../services/requirement-service';

@Component({
  selector: 'app-dashboard',
  imports: [
    Navbar
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  private reqService = inject(RequirementService);

  constructor() {

  }

  ngOnInit() {
    try {
      this.reqService.getRequirements();
    } catch (error) {
      console.error('Error fetching requirements:', error);
    }
  }

}
