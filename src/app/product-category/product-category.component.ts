import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { WebService } from '../shared/services/web.service'
import { ToastService } from '../shared/services/toast.service'

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
  dataList: any[] = [
    // {name:"test",code:"3546"},
    // {name:"test1",code:"6786"},
    // {name:"test2",code:"2342"},
    // {name:"test3",code:"789"},
    // {name:"test4",code:"687"},
    // {name:"test5",code:"343"},
    // {name:"test6",code:"7897"},
    // {name:"test7",code:"456"},
    // {name:"test8",code:"code15"},
    // {name:"test9",code:"code1"}

  ]
  constructor(private webService: WebService, private toast: ToastService) { }

  ngOnInit() {
    this.listProductCategory();
  }
  listProductCategory() {
    this.webService.commonMethod('/api/products_category', '', 'GET').subscribe(
      (data: any) => {
        if (data.Status == 'Success' && data.Response.length) {
          data.Response = data.Response.map((v: any) => {
            return {
              id: v.id,
              code: v.code,
              name: v.name
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

   this.toast.success("test");
    // this.visibility.listVisible = false;
    // this.visibility.createVisible = true;
    this.category = {
      id: 0,
      code: "",
      name: ""
    }
    this.showVisibility(true, false);
  }

  showList(flag: any) {
    // this.visibility.listVisible = true;
    // this.visibility.createVisible = false;
    this.showVisibility(false, true);
  }
  hideCreate() {
    // this.visibility.listVisible = true;
    // this.visibility.createVisible = false;
    this.showVisibility(false, true);
  }
  save() {
    if (this.category.id == 0) {
      this.webService.commonMethod('/api/products_category/create', this.category, 'POST').subscribe(
        (data: any) => {
          if (data.Status) {
            this.listProductCategory();
          }
        });
    }
    else {
      this.webService.commonMethod('/api/products_category/' + this.category.id, this.category, 'PUT').subscribe(
        (data: any) => {
          if (data.Status) {
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
    this.webService.commonMethod('/api/products_category/' + rowData.id, '', 'DELETE').subscribe(
      (data: any) => {
        if (data.Status) {
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
