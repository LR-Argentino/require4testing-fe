import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-stats-card',
  imports: [],
  templateUrl: './stats-card.html',
  styleUrl: './stats-card.css'
})
export class StatsCard {
  @Input() title: string = '';
  @Input() value: string = '';
}
