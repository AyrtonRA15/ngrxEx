import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import {
  DebugElement,
  Component,
  Output,
  EventEmitter,
  Input
} from '@angular/core';

import { By } from '@angular/platform-browser';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { AppComponent } from './app.component';
import { Store } from '@ngrx/store';
import { Row } from './models/row.model';
import { Statistics } from './models/statistics.model';
import * as fromList from './reducers/list.reducer';
import * as RowActions from './actions/list.actions';

export class DataStub {
  public getStateMock(): fromList.State {
    return {
      rows: [{ items: ['1', '2'] }, { items: ['3', '4', '5'] }],
      statistics: {
        minLength: 2,
        maxLength: 3,
        rowsAdded: 2,
        rowsDeleted: 0
      }
    };
  }
  public generateMockRows(): Observable<Row[]> {
    return of(this.getStateMock().rows);
  }
  public generateMockStatistics(): Observable<Statistics> {
    return of(this.getStateMock().statistics);
  }
  public generateMockMaxArrayLength(): Observable<number> {
    return of(this.getStateMock().statistics.maxLength);
  }
}

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
  let dataStub: DataStub;
  let mockRows$: Observable<Row[]>;
  let mockStatistics$: Observable<Statistics>;
  let mockMaxArrayLength$: Observable<number>;
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
            select: jasmine.createSpy('select'),
            dispatch: jasmine.createSpy('select').and.callFake(selector => {
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
    // Mock data
    dataStub = new DataStub();
    mockRows$ = dataStub.generateMockRows();
    mockStatistics$ = dataStub.generateMockStatistics();
    mockMaxArrayLength$ = dataStub.generateMockMaxArrayLength();
  });

  afterEach(() => {
    rowsSubject.complete();
    statisticsSubject.complete();
    maxArrayLengthSubject.complete();
  });

  it('should be readily initialized', () => {
    expect(component).toBeDefined();
  });

  it('should select different slices from store', () => {
    rowsSubject.next(dataStub.getStateMock().rows);
    fixture.detectChanges();
    expect(rowListStubComponent.rows).toEqual(dataStub.getStateMock().rows);

    statisticsSubject.next(dataStub.getStateMock().statistics);
    fixture.detectChanges();
    expect(rowStatisticsStubComponent.statistics).toEqual(
      dataStub.getStateMock().statistics
    );

    maxArrayLengthSubject.next(dataStub.getStateMock().statistics.maxLength);
    fixture.detectChanges();
    expect(rowListStubComponent.maxArrayLength).toEqual(
      dataStub.getStateMock().statistics.maxLength
    );

    // expect(store.select).toHaveBeenCalledWith(fromList.getStatisticsSelector);

    // expect(store.select).toHaveBeenCalledWith(fromList.getMaxLengthSelector);
  });

  it('should pass properties to child components', () => {
    component.rows$ = mockRows$;
    component.statistics$ = mockStatistics$;
    component.maxArrayLength$ = mockMaxArrayLength$;

    fixture.detectChanges();

    expect(rowListStubComponent.rows).toEqual(dataStub.getStateMock().rows);
    expect(rowListStubComponent.maxArrayLength).toEqual(
      dataStub.getStateMock().statistics.maxLength
    );
    expect(rowStatisticsStubComponent.statistics).toEqual(
      dataStub.getStateMock().statistics
    );
  });

  it('should dispatch create action when Create Button clicked', () => {
    const mockRow: Row = dataStub.getStateMock().rows[0];

    createRowStubComponent.create.emit(mockRow);
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(new RowActions.AddRow(mockRow));
  });

  it('should dispatch delete action when Delete Button clicked', () => {
    const mockIndex = 0;

    rowListStubComponent.delete.emit(mockIndex);
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(
      new RowActions.DeleteRow(mockIndex)
    );
  });
});
