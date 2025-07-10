import {Component} from '@angular/core';
import {StatsCard} from './stats-card/stats-card';
import {QuickActions} from './quick-actions/quick-actions';
import {Metrics} from './metrics/metrics';

@Component({
  selector: 'app-dashboard',
  imports: [
    StatsCard,
    QuickActions,
    Metrics
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

}
