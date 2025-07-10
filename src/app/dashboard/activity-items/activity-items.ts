import {Component} from '@angular/core';
import {ActivityItem} from '../../../shared/models/activity-item';

@Component({
  selector: 'app-activity-items',
  imports: [],
  templateUrl: './activity-items.html',
  styleUrl: './activity-items.css'
})
export class ActivityItems {
  protected activityItems: ActivityItem[] = [
    {
      activity: 'Recent Requirements',
      description: 'View the latest requirements added to the system.',
      action: 'View Requirements'
    },
    {
      activity: 'Recent Test Cases',
      description: 'Explore the most recently created test cases.',
      action: 'View Test Cases'
    },
    {
      activity: 'Recent Test Runs',
      description: 'See the latest test runs and their statuses.',
      action: 'View Test Runs'
    }
  ];

  protected onActionClick(action: string): void {
    console.log(`Action clicked: ${action}`);
  }
}
