import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Row } from '../models/row.model';

@Component({
  selector: 'app-row-list',
  templateUrl: './row-list.component.html',
  styleUrls: ['./row-list.component.scss']
})
export class RowListComponent implements OnInit {
  @Input() rows: Row[];
  @Input() maxArrayLength: number;
  @Output() delete: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  deleteRow(index: number) {
    this.delete.emit(index);
  }

  get maxLengthValue(): number[] {
    return Array(this.maxArrayLength);
  }
}
