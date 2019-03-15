import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowStatisticsComponent } from './row-statistics.component';

describe('RowStatisticsComponent', () => {
  let component: RowStatisticsComponent;
  let fixture: ComponentFixture<RowStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RowStatisticsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
