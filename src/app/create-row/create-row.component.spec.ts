import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewChild, Component } from '@angular/core';

import { CreateRowComponent } from './create-row.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  template: `
    <app-create-row #component (create)="createRow()"></app-create-row>
  `
})
class HostComponent {
  @ViewChild('component') public component: CreateRowComponent;
}

describe('CreateRowComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  let component: CreateRowComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule
      ],
      declarations: [HostComponent, CreateRowComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    component = host.component;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit on Create button click', () => {
    component.row = '1,2,3';
    // spy on event emitter
    spyOn(component.create, 'emit');

    // trigger the click
    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('button');
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component.create.emit).toHaveBeenCalledWith({
      items: ['1', '2', '3']
    });
  });
});
