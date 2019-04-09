import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-inventory-create',
  templateUrl: './inventory-create.component.html',
  styleUrls: ['./inventory-create.component.scss']
})
export class InventoryCreateComponent implements OnInit {
  @Output() eventForList = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  hideCreate() {
    this.eventForList.emit(true);
  }

}
