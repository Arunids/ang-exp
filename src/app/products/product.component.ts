import { Component, OnInit } from '@angular/core';
import { WebService } from '../shared/services/web.service';
import { ToastService } from '../shared/services/toast.service';
import { SpinnerService } from '../shared/services/spinner.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
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
  constructor(private webService: WebService, private toast: ToastService, private spinner:SpinnerService) { }

  ngOnInit() {
    this.listProductCategory();
  }
  listProductCategory() {
    this.spinner.loaderStart();
    this.webService.commonMethod('/api/product', '', 'GET').subscribe(
      (data: any) => {
        this.spinner.loaderStop();
        if (data.Status == 'Success' && data.Response.length) {
          data.Response = data.Response.map((v: any) => {
            return {
              id: v.id,
              image: v.image,
              name: v.name,
              price: v.price,
              product_category:v.product_category
            }
          });
        }
        this.dataList = data.Response;
        // this.visibility.listVisible = true;
        // this.visibility.createVisible = false;
        this.showVisibility(false, true);
      }

    )
  }

  showCreate(flag: any) {
    this.category = {
      id: 0,
      code: "",
      name: ""
    }
    this.showVisibility(true, false);
  }

  showList(flag: any) {
    this.showVisibility(false, true);
  }
  hideCreate() {
    this.showVisibility(false, true);
  }
  save() {
    this.spinner.loaderStart();
    if (this.category.id == 0) {
      this.webService.commonMethod('/api/products_category/create', this.category, 'POST').subscribe(
        (data: any) => {
          if (data.Status) {
            this.toast.success("Product Category Created Successfully..")
            this.spinner.loaderStop();
            this.listProductCategory();
          }
        });
    }
    else {
      this.webService.commonMethod('/api/products_category/' + this.category.id, this.category, 'PUT').subscribe(
        (data: any) => {
          if (data.Status) {
            this.toast.success("Product Category Updated Successfully..")

            this.spinner.loaderStop();
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
  }
  deleteRow(rowData:any){
    this.spinner.loaderStart();
    this.webService.commonMethod('/api/products_category/' + rowData.id, '', 'DELETE').subscribe(
      (data: any) => {
        if (data.Status) {
          this.toast.success("Product Category Deleted..")
          this.spinner.loaderStop();
          this.showVisibility(false,false);
          this.listProductCategory();
        }
      });
  }
  showVisibility(createFlag: boolean, listFlag: boolean) {
    this.visibility.listVisible = listFlag;
    this.visibility.createVisible = createFlag;
  }
}
