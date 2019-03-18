import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Row } from './models/row.model';
import * as RowActions from './actions/list.actions';
import * as fromList from './reducers/list.reducer';
import { Statistics } from './models/statistics.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public rows$: Observable<Row[]>;
  public statistics$: Observable<Statistics>;
  public maxArrayLength$: Observable<number>;

  constructor(private _store: Store<fromList.State>) {
    this.rows$ = this._store.select(fromList.getRowsSelector);
    this.statistics$ = this._store.select(fromList.getStatisticsSelector);
    this.maxArrayLength$ = this._store.select(fromList.getMaxLengthSelector);
  }

  createRow(event: Row): void {
    this._store.dispatch(new RowActions.AddRow(event));
  }

  deleteRow(event: number): void {
    this._store.dispatch(new RowActions.DeleteRow(event));
  }
}
