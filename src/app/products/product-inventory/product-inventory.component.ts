import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-inventory',
  templateUrl: './product-inventory.component.html',
  styleUrls: ['./product-inventory.component.scss']
})
export class ProductInventoryComponent implements OnInit {
  visibility: any = {
    "listVisible": true,
    "createVisible": false
  }
  constructor() { }

  ngOnInit() {
  }

  showCreate(event: any) {
    this.visibility.listVisible = false;
    this.visibility.createVisible = event;
  }

  showList(event: any) {
    this.visibility.listVisible = event;
    this.visibility.createVisible = false;
  }

}
