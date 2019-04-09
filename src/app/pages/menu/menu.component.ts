import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menuList: any = [{
    "id": 0,
    "name": "Home",
    "icon": ""
  }, {
    "id": 0,
    "name": "Products",
    "icon": "",
    "url": "/product-inventory"
  }, {
    "id": 0,
    "name": "Orders",
    "icon": ""
  }, {
    "id": 0,
    "name": "Settings",
    "icon": ""
  }]
  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateUrl(url: any) {
    console.log(url)
    this.router.navigate([url])
  }

}
