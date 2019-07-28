// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-data-table-plain',
//   templateUrl: './data-table-plain.component.html',
//   styleUrls: ['./data-table-plain.component.scss']
// })
// export class DataTablePlainComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }



import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ColumnHeader } from "../../shared/constant/table-column.const";

@Component({
  selector: 'app-data-table-plain',
  templateUrl: './data-table-plain.component.html',
  styleUrls: ['./data-table-plain.component.scss']
})

export class DataTablePlainComponent implements OnInit {

  @Input() dataList: any;
  displayedColumns: string[] = [];
  columnHeader: any = ColumnHeader
  dataSource: any;
  extraColumn: string[] = [];
  isListEmpty: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor() { }
  ngOnInit() {
    if (this.dataList.length) {
      this.isListEmpty = false;
      this.displayedColumns = Object.keys(this.dataList[0]);     
      this.dataSource = new MatTableDataSource<any>(this.dataList);
      this.dataSource.paginator = this.paginator;
    }
    else {
      this.isListEmpty = true;
    }
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}