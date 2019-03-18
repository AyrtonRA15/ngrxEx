import { Component, Input } from '@angular/core';
import { Statistics } from '../models/statistics.model';

@Component({
  selector: 'app-row-statistics',
  templateUrl: './row-statistics.component.html',
  styleUrls: ['./row-statistics.component.scss']
})
export class RowStatisticsComponent {
  @Input() public statistics: Statistics;

  constructor() {}
}
