import { Component } from '@angular/core';

@Component({
  selector: 'app-basic-grid',
  templateUrl: './basic-grid.component.html',
  styleUrls: ['./basic-grid.component.scss'],
})
export class BasicGridComponent {
  gridApi: any;
  gridColumnApi: any;
  rowData: any[] = [];
  columnDefs: any[] = [];

  constructor() {
    this.initializeGrid();
  }

  initializeGrid() {
    // Define column definitions - tells AG Grid what columns to display
    this.columnDefs = [
      { headerName: 'Name', field: 'name', width: 150 },
      { headerName: 'Age', field: 'age', width: 100 },
      { headerName: 'Country', field: 'country', width: 150 },
      { headerName: 'Department', field: 'department', width: 150 },
      { headerName: 'Salary', field: 'salary', width: 120 },
    ];

    // Sample data to display in the grid
    this.rowData = [
      {
        name: 'Alice Johnson',
        age: 28,
        country: 'USA',
        department: 'Engineering',
        salary: 95000,
      },
      {
        name: 'Bob Smith',
        age: 35,
        country: 'Canada',
        department: 'Sales',
        salary: 75000,
      },
      {
        name: 'Carol Williams',
        age: 32,
        country: 'UK',
        department: 'Marketing',
        salary: 70000,
      },
      {
        name: 'David Brown',
        age: 29,
        country: 'USA',
        department: 'Engineering',
        salary: 88000,
      },
      {
        name: 'Emma Davis',
        age: 31,
        country: 'Australia',
        department: 'HR',
        salary: 65000,
      },
      {
        name: 'Frank Miller',
        age: 40,
        country: 'USA',
        department: 'Management',
        salary: 110000,
      },
      {
        name: 'Grace Taylor',
        age: 27,
        country: 'Germany',
        department: 'Engineering',
        salary: 92000,
      },
      {
        name: 'Henry Anderson',
        age: 38,
        country: 'France',
        department: 'Sales',
        salary: 78000,
      },
      {
        name: 'Ivy Thomas',
        age: 26,
        country: 'Japan',
        department: 'Engineering',
        salary: 85000,
      },
      {
        name: 'Jack Jackson',
        age: 33,
        country: 'USA',
        department: 'Finance',
        salary: 82000,
      },
    ];
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
}
