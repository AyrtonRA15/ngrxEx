import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromList from '../reducers/list.reducer';
import { Statistics } from '../models/statistics.model';

@Component({
  selector: 'app-row-statistics',
  templateUrl: './row-statistics.component.html',
  styleUrls: ['./row-statistics.component.scss']
})
export class RowStatisticsComponent implements OnInit {
  statistics: Statistics;

  constructor(private store: Store<fromList.State>) {}

  ngOnInit() {
    this.store
      .select(fromList.getStatisticsSelector)
      .subscribe((statistics: Statistics) => {
        this.statistics = statistics;
      });
  }
}
