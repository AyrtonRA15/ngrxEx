import { Component, Output, EventEmitter } from '@angular/core';
import { Row } from '../models/row.model';

@Component({
  selector: 'app-create-row',
  templateUrl: './create-row.component.html',
  styleUrls: ['./create-row.component.scss']
})
export class CreateRowComponent {
  public row: string;

  @Output() public create: EventEmitter<Row> = new EventEmitter();

  constructor() {}

  createRow(): void {
    if (this.row) {
      this.create.emit({ items: this.row.split(',') });
    }
  }
}
