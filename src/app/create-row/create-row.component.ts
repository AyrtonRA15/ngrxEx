import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as RowActions from './../actions/list.actions';
import * as fromList from '../reducers/list.reducer';

@Component({
  selector: 'app-create-row',
  templateUrl: './create-row.component.html',
  styleUrls: ['./create-row.component.scss']
})
export class CreateRowComponent implements OnInit {
  row: string;

  constructor(private store: Store<fromList.State>) {}

  ngOnInit() {}

  createRow() {
    if (this.row) {
      this.store.dispatch(
        new RowActions.AddRow({ items: this.row.split(',') })
      );
    }
  }
}
