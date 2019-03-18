import { Action } from '@ngrx/store';
import { Row } from '../models/row.model';

export const ADD_ROW = '[ROW] Add';
export const DELETE_ROW = '[ROW] Delete';

export class AddRow implements Action {
  public readonly type = ADD_ROW;

  constructor(public payload: Row) {}
}

export class DeleteRow implements Action {
  public readonly type = DELETE_ROW;

  constructor(public payload: number) {}
}

export type Actions = AddRow | DeleteRow;
