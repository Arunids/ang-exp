import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ColumnHeader } from "../../shared/constant/table-column.const";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})

export class DataTableComponent implements OnInit {
  @Output() eventForCreate = new EventEmitter();
  @Input() dataList: any;
  displayedColumns: string[] = [];
  _columnHeader: any = ColumnHeader
  dataSource: any;
  displayValue: any = {};

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor() { }
  ngOnInit() {
    this.displayedColumns = Object.keys(this.dataList[0]);
    this.dataSource = new MatTableDataSource<any>(this.dataList)
    this.dataSource.paginator = this.paginator;
    for (let x in this.displayedColumns) {
      this.displayValue[this.displayedColumns[x]] = this._columnHeader[this.displayedColumns[x]]
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showCreate() {
    this.eventForCreate.emit(true)
  }
}

// export interface PeriodicElement {
//   name: string;
//   position: string;
//   weight: number;
//   symbol: string;
// }
