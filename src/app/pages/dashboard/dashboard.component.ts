import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  color = {
    green:'#32da29',
    red:'#ff0000',
    blue:'#0000ff',
    pink : '#fb05c4'
  };
  list:any[]=[
    {icon:'fa fa-image',color:'#FF0000',title:'Product Category',value:Math.floor(Math.random()*100),URL:'/product-category'},
    {icon:'fa fa-image',color:'#32da29',title:'Product',value:Math.floor(Math.random()*100),URL:'/product-inventory'},
    {icon:'fa fa-image',color:'#0000FF',title:'Orders',value:Math.floor(Math.random()*100),URL:'/orders'}
  ];
  constructor(private router:Router
    ) {}

  ngOnInit() {
  }
  redirectURL(url:string){
    this.router.navigate([url]);
  }

}
