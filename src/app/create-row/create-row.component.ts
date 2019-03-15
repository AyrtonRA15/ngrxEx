import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Row } from '../models/row.model';

@Component({
  selector: 'app-create-row',
  templateUrl: './create-row.component.html',
  styleUrls: ['./create-row.component.scss']
})
export class CreateRowComponent implements OnInit {
  row: string;

  @Output() create: EventEmitter<Row> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  createRow() {
    if (this.row) {
      this.create.emit({ items: this.row.split(',') });
    }
  }
}
