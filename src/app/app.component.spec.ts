import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Store } from '@ngrx/store';
import * as fromList from './reducers/list.reducer';
import * as RowActions from './actions/list.actions';
import { CreateRowComponent } from './create-row/create-row.component';
import { RowStatisticsComponent } from './row-statistics/row-statistics.component';
import { RowListComponent } from './row-list/row-list.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable, of } from 'rxjs';
import { Row } from './models/row.model';
import { Statistics } from './models/statistics.model';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

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

const storeStub = {
  select: jasmine.createSpy('select'),
  dispatch: jasmine.createSpy('dispatch')
};

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let debugElement: DebugElement;
  let createRowComponent: CreateRowComponent;
  let rowListComponent: RowListComponent;
  let rowStatisticsComponent: RowStatisticsComponent;
  let dataStub: DataStub;
  let mockRows$: Observable<Row[]>;
  let mockStatistics$: Observable<Statistics>;
  let mockMaxArrayLength$: Observable<number>;
  let store: Store<fromList.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule
      ],
      declarations: [
        AppComponent,
        CreateRowComponent,
        RowListComponent,
        RowStatisticsComponent
      ],
      providers: [
        {
          provide: Store,
          useValue: storeStub
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    store = TestBed.get(Store);
    createRowComponent = debugElement.query(By.directive(CreateRowComponent))
      .componentInstance;
    rowListComponent = debugElement.query(By.directive(RowListComponent))
      .componentInstance;
    rowStatisticsComponent = debugElement.query(
      By.directive(RowStatisticsComponent)
    ).componentInstance;
    // Mock data
    dataStub = new DataStub();
    mockRows$ = dataStub.generateMockRows();
    mockStatistics$ = dataStub.generateMockStatistics();
    mockMaxArrayLength$ = dataStub.generateMockMaxArrayLength();
  });

  it('should be readily initialized', () => {
    expect(component).toBeDefined();
  });

  it('should select different slices from store', () => {
    expect(store.select).toHaveBeenCalledWith(fromList.getRowsSelector);

    expect(store.select).toHaveBeenCalledWith(fromList.getStatisticsSelector);

    expect(store.select).toHaveBeenCalledWith(fromList.getMaxLengthSelector);
  });

  it('should pass properties to child components', () => {
    component.rows$ = mockRows$;
    component.statistics$ = mockStatistics$;
    component.maxArrayLength$ = mockMaxArrayLength$;

    fixture.detectChanges();

    expect(rowListComponent.rows).toEqual(dataStub.getStateMock().rows);
    expect(rowListComponent.maxArrayLength).toEqual(
      dataStub.getStateMock().statistics.maxLength
    );
    expect(rowStatisticsComponent.statistics).toEqual(
      dataStub.getStateMock().statistics
    );
  });

  it('should dispatch create action when Create Button clicked', () => {
    const mockRow: Row = dataStub.getStateMock().rows[0];

    createRowComponent.create.emit(mockRow);
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(new RowActions.AddRow(mockRow));
  });

  it('should dispatch delete action when Delete Button clicked', () => {
    const mockIndex = 0;

    rowListComponent.delete.emit(mockIndex);
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(
      new RowActions.DeleteRow(mockIndex)
    );
  });
});
