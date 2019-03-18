import { Row } from '../models/row.model';
import { Statistics } from '../models/statistics.model';
import * as RowActions from '../actions/list.actions';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export interface State {
  rows: Row[];
  statistics: Statistics;
}

export const initialState: State = {
  rows: [],
  statistics: {
    minLength: 0,
    maxLength: 0,
    rowsAdded: 0,
    rowsDeleted: 0
  }
};

export function reducer(
  state: State = initialState,
  action: RowActions.Actions
): State {
  switch (action.type) {
    case RowActions.ADD_ROW:
      const maxValueAdd = Math.max(
        action.payload.items.length,
        state.statistics.maxLength
      );
      let minValueAdd: number;
      if (state.rows.length === 0) {
        minValueAdd = action.payload.items.length;
      } else {
        minValueAdd = Math.min(
          action.payload.items.length,
          state.statistics.minLength
        );
      }

      return {
        rows: [...state.rows, action.payload],
        statistics: {
          minLength: minValueAdd,
          maxLength: maxValueAdd,
          rowsAdded: state.statistics.rowsAdded + 1,
          rowsDeleted: state.statistics.rowsDeleted
        }
      };

    case RowActions.DELETE_ROW:
      state.rows.splice(action.payload, 1);

      const maxValueRemove = state.rows.reduce(
        (max, row) => (max > row.items.length ? max : row.items.length),
        0
      );
      let minValueRemove: number;
      if (state.rows.length === 0) {
        minValueRemove = 0;
      } else {
        minValueRemove = state.rows.reduce(
          (min, row) => (min < row.items.length ? min : row.items.length),
          state.statistics.maxLength
        );
      }

      return {
        rows: state.rows,
        statistics: {
          minLength: minValueRemove,
          maxLength: maxValueRemove,
          rowsAdded: state.statistics.rowsAdded,
          rowsDeleted: state.statistics.rowsDeleted + 1
        }
      };
    default:
      return state;
  }
}

export const getListState = createFeatureSelector('listState');

export const getRows = (state: State) => state.rows;
export const getStatistics = (state: State) => state.statistics;
export const getMaxLength = (state: State) => state.statistics.maxLength;

export const getRowsSelector = createSelector(
  getListState,
  getRows
);

export const getStatisticsSelector = createSelector(
  getListState,
  getStatistics
);

export const getMaxLengthSelector = createSelector(
  getListState,
  getMaxLength
);
