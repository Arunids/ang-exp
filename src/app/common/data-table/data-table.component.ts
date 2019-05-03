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
  @Output() editPage?:any = new EventEmitter();
  @Output() deletePage?:any = new EventEmitter();
  @Input() dataList: any;
  @Input() editVisibliliy?:boolean = true;
  displayedColumns: string[] = [];
  columnHeader: any = ColumnHeader
  dataSource: any;
  // displayValue: any = {};
extraColumn:string[]=[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor() { }
  ngOnInit() {
    let actualCol:any = Object.keys(this.dataList[0]);
    actualCol = actualCol.filter((v:any) => v != 'id');
    this.displayedColumns = actualCol;
    this.extraColumn = [...actualCol];
    if(this.editVisibliliy)
    this.extraColumn.unshift('actions');
    
    // this.displayedColumns = ['action','code','name'];
    this.dataSource = new MatTableDataSource<any>(this.dataList)
    this.dataSource.paginator = this.paginator;
    // for (let x in this.displayedColumns) {
    //   this.displayValue[this.displayedColumns[x]] = this._columnHeader[this.displayedColumns[x]]
    // }
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
  editEmit(elem:any) {
    this.editPage.emit(elem);
  }
  deleteEmit(elem:any) {
    this.deletePage.emit(elem)
  }
}

// export interface PeriodicElement {
//   name: string;
//   position: string;
//   weight: number;
//   symbol: string;
// }
