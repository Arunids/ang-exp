import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WebService } from 'src/app/shared/services/web.service';

@Component({
  selector: 'app-inventory-create',
  templateUrl: './inventory-create.component.html',
  styleUrls: ['./inventory-create.component.scss'],
  providers: [WebService]
})
export class InventoryCreateComponent implements OnInit {
  @Output() eventForList = new EventEmitter();
  createObj: any = {};
  constructor(private _webservice: WebService) { }

  ngOnInit() {
  }

  hideCreate() {
    this.eventForList.emit(true);
  }

  saveProduct() {
    // console.log(this.createObj)
    let requestObj = {
      "code": this.createObj.code,
      "name": this.createObj.name,
      "description": this.createObj.description,
      "price": this.createObj.price,
      "image": "",
      "is_stock": "",
      "category_id": "",
      "created_by": "",
      "created_date": "",
      "modified_by": "",
      "modified_date": "",
    }
    this._webservice.commonPostMethod("/api/product/create", requestObj).
      subscribe(
        data => {

        },
        error => {
        }
      );
  }

}
