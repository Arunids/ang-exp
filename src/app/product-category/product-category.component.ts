import { Component, OnInit } from '@angular/core';
import { WebService } from '../shared/services/web.service';
import { ToastService } from '../shared/services/toast.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {
  visibility: any = {
    "listVisible": false,
    "createVisible": false
  }
  category: any = {
    id: 0,
    code: "",
    name: ""
  }
  dataList: any[] = [];
  constructor(private webService: WebService, private toast: ToastService) { }

  ngOnInit() {
    this.listProductCategory();
  }
  listProductCategory() {
    this.webService.listItem('/api/products_category', (data: any,message:string) => {
      if(data){
      data.Response = data.Response.map((v: any) => {
        return {
          id: v.id,
          code: v.code,
          name: v.name
        }
      });
      this.dataList = data.Response;
    }
    else {
      this.dataList = [];
      this.toast.error(message)
    }
    this.showVisibility(false, true);

    });
  }

  showCreate(flag: any) {
    this.category = {
      id: 0,
      code: "",
      name: ""
    }
    this.showVisibility(true, false);
    this.webService.setFocus('matcode');
  }

  showList(flag: any) {
    this.showVisibility(false, true);
  }
  hideCreate() {
    this.showVisibility(false, true);
  }
  save(flag: boolean) {
    this.showVisibility(false, false);
    if (this.category.id == 0) {
      this.webService.createItem('/api/products_category/create', this.category, (data: any) => {
        if (data) {
          if (flag) {
            this.showCreate(false);
          }
          else
            this.listProductCategory();
        }
      });
    }
    else {
      this.webService.updateItem('/api/products_category/' + this.category.id, this.category, (data: any) => {
        if (data) {
          this.toast.success("Product Category Updated Successfully..")
          this.listProductCategory();
        }
      });
    }
  }
  viewRow(rowData: any) {
    this.category.id = rowData.id;
    this.category.code = rowData.code;
    this.category.name = rowData.name;
    this.showVisibility(true, false);
    this.webService.setFocus('matcode');
  }
  deleteRow(rowData: any) {
    this.webService.deleteItem('/api/products_category/', rowData, (data: any) => {
      if (data) {
        this.toast.success("Product Category Deleted..");
        this.showVisibility(false, false);

        this.listProductCategory();
      }
    });
  }
  showVisibility(createFlag: boolean, listFlag: boolean) {
    this.visibility.listVisible = listFlag;
    this.visibility.createVisible = createFlag;
  }
}