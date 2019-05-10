import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ColumnHeader } from "../../shared/constant/table-column.const";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})

export class DataTableComponent implements OnInit {
  @Output() eventForCreate = new EventEmitter();
  @Output() editPage?: any = new EventEmitter();
  @Output() deletePage?: any = new EventEmitter();
  @Input() dataList: any;
  @Input() editVisibliliy?: boolean = true;
  displayedColumns: string[] = [];
  columnHeader: any = ColumnHeader
  dataSource: any;
  extraColumn: string[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor() { }
  ngOnInit() {
    let actualCol: any = Object.keys(this.dataList[0]);
    actualCol = actualCol.filter((v: any) => v != 'id');
    this.displayedColumns = actualCol;
    this.extraColumn = [...actualCol];
    if (this.editVisibliliy)
      this.extraColumn.unshift('actions');
    this.dataSource = new MatTableDataSource<any>(this.dataList)
    this.dataSource.paginator = this.paginator;
  }
  // displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<any>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showCreate() {
    this.eventForCreate.emit(true);
  }
  editEmit() {    
    this.editPage.emit(this.selection.selected[0]);
  }
  deleteEmit() {
    if(this.selection.selected.length){
      let idList:number[]= this.selection.selected.map((v:any)=>{
        return v.id;
      });
      console.log(idList);
    this.deletePage.emit(idList);
    }
  }
}