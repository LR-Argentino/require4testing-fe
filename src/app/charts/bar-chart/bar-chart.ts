import {Component} from '@angular/core';
import {ChartData} from '../../../shared/models/chart-data';

@Component({
  selector: 'app-bar-chart',
  imports: [],
  templateUrl: './bar-chart.html',
  styleUrl: './bar-chart.css'
})
export class BarChart {
  protected chartData: ChartData[] = [
    {label: 'High', value: 1.0, color: '#374151'},
    {label: 'Medium', value: 0.8, color: '#4b5563'},
    {label: 'Low', value: 0.5, color: '#6b7280'}
  ];
}
