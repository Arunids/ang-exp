import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})

export class InventoryListComponent implements OnInit {
  dataList: any = [
    { position: "19E", name: 'Mobile', weight: 1.0079, symbol: '100' },
    { position: "29E", name: 'Mobile', weight: 4.0026, symbol: '20' },
    { position: "39E", name: 'Mobile', weight: 6.941, symbol: '23' },
    { position: "49E", name: 'Mobile', weight: 9.0122, symbol: '45' },
    { position: "49E", name: 'Mobile', weight: 10.811, symbol: '50' },
    { position: "59E", name: 'Mobile', weight: 12.0107, symbol: '10' },
    { position: "69E", name: 'Mobile', weight: 14.0067, symbol: '19' },
    { position: "79E", name: 'Mobile', weight: 15.9994, symbol: '20' },
    { position: "89E", name: 'Mobile', weight: 18.9984, symbol: '34' },
    { position: "99E", name: 'Mobile', weight: 20.1797, symbol: '65' },
    { position: "109E", name: 'Mobile', weight: 22.9897, symbol: '05' },
    { position: "119E", name: 'Mobile', weight: 24.305, symbol: '15' },
    { position: "129E", name: 'Mobile', weight: 26.9815, symbol: '25' },
    { position: "139E", name: 'Mobile', weight: 28.0855, symbol: '30' },
    { position: "149E", name: 'Mobile', weight: 30.9738, symbol: '10' },
    { position: "159E", name: 'Mobile', weight: 32.065, symbol: '20' },
    { position: "169E", name: 'Mobile', weight: 35.453, symbol: '22' },
    { position: "179E", name: 'Mobile', weight: 39.948, symbol: '24' },
    { position: "189E", name: 'Mobile', weight: 39.0983, symbol: '50' },
    { position: "199E", name: 'Mobile', weight: 40.078, symbol: '08' },
  ];
  constructor() { }
  ngOnInit() {

  }
}

