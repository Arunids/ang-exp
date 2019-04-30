import { Component, OnInit } from '@angular/core';
import {WebService} from '../shared/services/web.service'

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {
  visibility: any = {
    "listVisible": true,
    "createVisible": false
  }
dataList:any[]=[
  {name:"test",code:"3546"},
  {name:"test1",code:"6786"},
  {name:"test2",code:"2342"},
  {name:"test3",code:"789"},
  {name:"test4",code:"687"},
  {name:"test5",code:"343"},
  {name:"test6",code:"7897"},
  {name:"test7",code:"456"},
  {name:"test8",code:"code15"},
  {name:"test9",code:"code1"}

]
  constructor(private webService:WebService) { }

  ngOnInit() {
    this.listProductCategory();
  }
  listProductCategory(){
    this.webService.commonMethod('/api/products_category','','GET').subscribe(
      data => {
        console.log(data);
      }
      
    )
  }
  
  showCreate(flag: any) {
    this.visibility.listVisible = false;
    this.visibility.createVisible = true;
  }

  showList(flag: any) {
    this.visibility.listVisible = true;
    this.visibility.createVisible = false;
  }
  hideCreate(){
    this.visibility.listVisible = true;
    this.visibility.createVisible = false;
  }
  save(){
    console.log(Response);
  }
}
