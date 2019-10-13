import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Observable } from 'rxjs';

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
    "url": "/dashboard"
  },
  {
    "id": 0,
    "name": "Product Category",
    "icon": "",
    "url": "/product-category"
  },
  {
    "id": 0,
    "name": "Products",
    "icon": "",
    "url": "/product"
  }, {
    "id": 0,
    "name": "Orders",
    "icon": "",
    "url": "/orders"
  }, {
    "id": 0,
    "name": "Settings",
    "icon": "",
    "url": "/setting"
  }];
  isLoggedIn$: Observable<boolean>;
  constructor(private router: Router, private authService: AuthService) { }

  onLogout() {
    this.authService.logout();
  }


  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isLoggedIn$.subscribe(
      data => {
        console.log(data);

        this.makeActiveMenu();
      }
    );

  }

  navigateUrl(url: any) {
    this.router.navigate([url]);
    setTimeout(() => {
      this.makeActiveMenu();
    }, 100);
  }

  makeActiveMenu() {
    // console.log(window.location.hash.substring(1));
    for (let x of this.menuList) {
      x.isActive = false;
    }
    let currentUrl: string = window.location.hash.substring(1);
    if (currentUrl == '/login')
      currentUrl = '/dashboard';
    for (let x of this.menuList) {
      if (x.url == currentUrl) {
        x.isActive = true;
      }
    }
  }

}
