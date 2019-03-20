import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import {
  DebugElement,
  Component,
  Output,
  EventEmitter,
  Input
} from '@angular/core';

import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { AppComponent } from './app.component';
import { Store } from '@ngrx/store';
import { Row } from './models/row.model';
import { Statistics } from './models/statistics.model';
import * as fromList from './reducers/list.reducer';
import * as RowActions from './actions/list.actions';

@Component({ selector: 'app-create-row', template: '' })
class CreateRowStubComponent {
  @Output() public create: EventEmitter<Row> = new EventEmitter();
}

@Component({ selector: 'app-row-list', template: '' })
class RowListStubComponent {
  @Input() public rows: Row[];
  @Input() public maxArrayLength: number;
  @Output() public delete: EventEmitter<number> = new EventEmitter();
}

@Component({ selector: 'app-row-statistics', template: '' })
class RowStatisticsStubComponent {
  @Input() public statistics: Statistics;
}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let debugElement: DebugElement;
  let createRowStubComponent: CreateRowStubComponent;
  let rowListStubComponent: RowListStubComponent;
  let rowStatisticsStubComponent: RowStatisticsStubComponent;
  let store: Store<fromList.State>;

  let rowsSubject: BehaviorSubject<Row[]>;
  let statisticsSubject: BehaviorSubject<Statistics>;
  let maxArrayLengthSubject: BehaviorSubject<number>;

  beforeEach(async(() => {
    rowsSubject = new BehaviorSubject(fromList.initialState.rows);
    statisticsSubject = new BehaviorSubject(fromList.initialState.statistics);
    maxArrayLengthSubject = new BehaviorSubject(0);

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CreateRowStubComponent,
        RowListStubComponent,
        RowStatisticsStubComponent
      ],
      providers: [
        {
          provide: Store,
          useValue: {
            dispatch: jasmine.createSpy('dispatch'),
            select: jasmine.createSpy('select').and.callFake(selector => {
              switch (selector) {
                case fromList.getRowsSelector:
                  return rowsSubject.asObservable();
                case fromList.getStatisticsSelector:
                  return statisticsSubject.asObservable();
                case fromList.getMaxLengthSelector:
                  return maxArrayLengthSubject.asObservable();
              }
            })
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    store = TestBed.get(Store);
    createRowStubComponent = debugElement.query(
      By.directive(CreateRowStubComponent)
    ).componentInstance;
    rowListStubComponent = debugElement.query(
      By.directive(RowListStubComponent)
    ).componentInstance;
    rowStatisticsStubComponent = debugElement.query(
      By.directive(RowStatisticsStubComponent)
    ).componentInstance;
  });

  afterEach(() => {
    rowsSubject.complete();
    statisticsSubject.complete();
    maxArrayLengthSubject.complete();
  });

  it('should be readily initialized', () => {
    expect(component).toBeDefined();
  });

  describe('Store Selectors', () => {
    it('should select Rows from store', () => {
      const row1: Row[] = [];
      rowsSubject.next(row1);
      fixture.detectChanges();
      expect(rowListStubComponent.rows).toEqual(row1);

      const row2: Row[] = [{ items: ['1'] }];
      rowsSubject.next(row2);
      fixture.detectChanges();
      expect(rowListStubComponent.rows).toEqual(row2);

      const row3: Row[] = [{ items: ['1'] }, { items: ['1', '2'] }];
      rowsSubject.next(row3);
      fixture.detectChanges();
      expect(rowListStubComponent.rows).toEqual(row3);
    });

    it('should select Statistics from store', () => {
      const statistics1: Statistics = {
        minLength: 0,
        maxLength: 0,
        rowsAdded: 0,
        rowsDeleted: 0
      };
      statisticsSubject.next(statistics1);
      fixture.detectChanges();
      expect(rowStatisticsStubComponent.statistics).toEqual(statistics1);

      const statistics2: Statistics = {
        minLength: 1,
        maxLength: 1,
        rowsAdded: 1,
        rowsDeleted: 0
      };
      statisticsSubject.next(statistics2);
      fixture.detectChanges();
      expect(rowStatisticsStubComponent.statistics).toEqual(statistics2);

      const statistics3: Statistics = {
        minLength: 0,
        maxLength: 0,
        rowsAdded: 2,
        rowsDeleted: 2
      };
      statisticsSubject.next(statistics3);
      fixture.detectChanges();
      expect(rowStatisticsStubComponent.statistics).toEqual(statistics3);
    });

    it('should select MaxArrayLength property from store', () => {
      const maxArrayLength1 = 0;
      maxArrayLengthSubject.next(maxArrayLength1);
      fixture.detectChanges();
      expect(rowListStubComponent.maxArrayLength).toEqual(maxArrayLength1);

      const maxArrayLength2 = 1;
      maxArrayLengthSubject.next(maxArrayLength2);
      fixture.detectChanges();
      expect(rowListStubComponent.maxArrayLength).toEqual(maxArrayLength2);

      const maxArrayLength3 = 2;
      maxArrayLengthSubject.next(maxArrayLength3);
      fixture.detectChanges();
      expect(rowListStubComponent.maxArrayLength).toEqual(maxArrayLength3);
    });
  });

  it('should dispatch create action when Create Button clicked', () => {
    const row: Row = { items: ['1'] };

    createRowStubComponent.create.emit(row);
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(new RowActions.AddRow(row));
  });

  it('should dispatch delete action when Delete Button clicked', () => {
    const index = 0;

    rowListStubComponent.delete.emit(index);
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(
      new RowActions.DeleteRow(index)
    );
  });
});
