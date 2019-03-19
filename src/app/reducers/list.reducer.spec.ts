import * as fromList from '../reducers/list.reducer';
import * as fromActions from '../actions/list.actions';
import { Row } from '../models/row.model';

describe('ListReducer', () => {
  it('should return the default state', () => {
    const { initialState } = fromList;
    const action = {
      type: undefined,
      payload: undefined
    };
    const state = fromList.reducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should add row to list and update statistics', () => {
    const { initialState } = fromList;
    const newRow: Row = { items: ['1'] };
    const action = new fromActions.AddRow(newRow);
    const state = fromList.reducer(initialState, action);

    expect(state.rows).toEqual([newRow]);
    expect(state.statistics.minLength).toBe(1);
    expect(state.statistics.maxLength).toBe(1);
    expect(state.statistics.rowsAdded).toBe(1);
    expect(state.statistics.rowsDeleted).toBe(0);
  });

  it('should delete row from list and update statistics', () => {
    const currentState: fromList.State = {
      rows: [{ items: ['1'] }],
      statistics: {
        minLength: 1,
        maxLength: 1,
        rowsAdded: 1,
        rowsDeleted: 0
      }
    };
    const action = new fromActions.DeleteRow(0);
    const state = fromList.reducer(currentState, action);

    expect(state.rows).toEqual([]);
    expect(state.statistics.minLength).toBe(0);
    expect(state.statistics.maxLength).toBe(0);
    expect(state.statistics.rowsAdded).toBe(1);
    expect(state.statistics.rowsDeleted).toBe(1);
  });
});
