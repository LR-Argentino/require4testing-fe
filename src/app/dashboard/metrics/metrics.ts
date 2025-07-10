import {Component} from '@angular/core';
import {LineChart} from '../../charts/line-chart/line-chart';
import {BarChart} from '../../charts/bar-chart/bar-chart';

@Component({
  selector: 'app-metrics',
  imports: [
    LineChart,
    BarChart
  ],
  templateUrl: './metrics.html',
  styleUrl: './metrics.css'
})
export class Metrics {

}
