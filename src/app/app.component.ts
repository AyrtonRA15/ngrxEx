import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Row } from './models/row.model';
import * as RowActions from './actions/list.actions';
import * as fromList from './reducers/list.reducer';
import { Statistics } from './models/statistics.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  rows: Row[];
  statistics: Statistics;
  maxArrayLength = 0;

  constructor(private store: Store<fromList.State>) {}

  ngOnInit() {
    this.store
      .select(fromList.getAllSelector)
      .subscribe((state: fromList.State) => {
        this.maxArrayLength = state.statistics.maxLength;
        this.rows = state.rows;
        this.statistics = state.statistics;
      });
  }

  createRow(event: Row) {
    this.store.dispatch(new RowActions.AddRow(event));
  }

  deleteRow(event: number) {
    this.store.dispatch(new RowActions.DeleteRow(event));
  }
}
