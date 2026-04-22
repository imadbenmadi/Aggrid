import { Component } from '@angular/core';

@Component({
  selector: 'app-grouping',
  templateUrl: './grouping.component.html',
  styleUrls: ['./grouping.component.scss'],
})
export class GroupingComponent {
  gridApi: any;
  gridColumnApi: any;
  rowData: any[] = [];
  columnDefs: any[] = [];

  constructor() {
    this.initializeGrid();
  }

  initializeGrid() {
    this.columnDefs = [
      { headerName: 'Name', field: 'name', width: 150 },
      {
        headerName: 'Department',
        field: 'department',
        width: 150,
        rowGroup: true,
        hide: true,
      },
      { headerName: 'Age', field: 'age', width: 100 },
      {
        headerName: 'Salary',
        field: 'salary',
        width: 130,
        aggFunc: 'sum',
        valueFormatter: (params: any) => '$' + params.value?.toLocaleString(),
      },
    ];

    this.rowData = [
      {
        name: 'Alice Johnson',
        department: 'Engineering',
        age: 28,
        salary: 95000,
      },
      {
        name: 'Grace Taylor',
        department: 'Engineering',
        age: 27,
        salary: 92000,
      },
      {
        name: 'David Brown',
        department: 'Engineering',
        age: 29,
        salary: 88000,
      },
      { name: 'Bob Smith', department: 'Sales', age: 35, salary: 75000 },
      { name: 'Henry Anderson', department: 'Sales', age: 38, salary: 78000 },
      {
        name: 'Carol Williams',
        department: 'Marketing',
        age: 32,
        salary: 70000,
      },
      { name: 'Emma Davis', department: 'HR', age: 31, salary: 65000 },
      {
        name: 'Frank Miller',
        department: 'Management',
        age: 40,
        salary: 110000,
      },
    ];
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  expandAll() {
    this.gridApi?.expandAll();
  }

  collapseAll() {
    this.gridApi?.collapseAll();
  }

  groupByDept() {
    this.gridColumnApi?.setRowGroupColumns(['department']);
  }

  clearGrouping() {
    this.gridColumnApi?.setRowGroupColumns([]);
  }
}
