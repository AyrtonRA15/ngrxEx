import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Row } from '../models/row.model';

@Component({
  selector: 'app-row-list',
  templateUrl: './row-list.component.html',
  styleUrls: ['./row-list.component.scss']
})
export class RowListComponent {
  @Input() public rows: Row[];
  @Input() public maxArrayLength: number;
  @Output() public delete: EventEmitter<number> = new EventEmitter();

  constructor() {}

  deleteRow(index: number): void {
    this.delete.emit(index);
  }

  get maxLengthValue(): number[] {
    return Array(this.maxArrayLength);
  }
}
