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
    "icon": "",
    "url": ""
  }, {
    "id": 0,
    "name": "Products",
    "icon": "",
    "url": "/product-inventory"
  }, {
    "id": 0,
    "name": "Orders",
    "icon": "",
    "url": "/orders"
  }, {
    "id": 0,
    "name": "Settings",
    "icon": "",
    "url": ""
  }]
  constructor(private router: Router) { }

  ngOnInit() {
    this.makeActiveMenu();
  }

  navigateUrl(url: any) {
    this.router.navigate([url])
  }

  makeActiveMenu() {
    let currentUrl: string = window.location.hash.substring(1);
    for (let x of this.menuList) {
      if (x.url == currentUrl) {
        x.isActive = true;
      }
    }
  }

}
