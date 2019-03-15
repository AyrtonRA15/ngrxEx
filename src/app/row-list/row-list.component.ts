import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Row } from '../models/row.model';

import * as RowActions from '../actions/list.actions';
import * as fromList from '../reducers/list.reducer';

@Component({
  selector: 'app-row-list',
  templateUrl: './row-list.component.html',
  styleUrls: ['./row-list.component.scss']
})
export class RowListComponent implements OnInit {
  rows: Row[] = [];
  maxLength = 0;

  constructor(private store: Store<fromList.State>) {}

  ngOnInit() {
    this.store
      .select(fromList.getAllSelector)
      .subscribe((appState: fromList.State) => {
        this.maxLength = appState.statistics.maxLength;
        this.rows = appState.rows;
      });
  }

  deleteRow(index: number) {
    this.store.dispatch(new RowActions.DeleteRow(index));
  }

  get maxLengthValue(): number[] {
    return Array(this.maxLength);
  }
}
