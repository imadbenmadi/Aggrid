import { Component } from '@angular/core';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss'],
})
export class SelectionComponent {
  gridApi: any;
  gridColumnApi: any;
  rowData: any[] = [];
  columnDefs: any[] = [];
  selectedRows: any[] = [];
  selectionMode: string = 'multiple';

  constructor() {
    this.initializeGrid();
  }

  initializeGrid() {
    this.columnDefs = [
      {
        headerName: 'Select',
        field: 'select',
        width: 80,
        checkboxSelection: true,
        headerCheckboxSelection: true,
      },
      { headerName: 'Name', field: 'name', width: 150 },
      { headerName: 'Age', field: 'age', width: 100 },
      { headerName: 'Department', field: 'department', width: 150 },
      { headerName: 'Salary', field: 'salary', width: 130 },
    ];

    this.rowData = [
      {
        name: 'Alice Johnson',
        age: 28,
        department: 'Engineering',
        salary: 95000,
      },
      { name: 'Bob Smith', age: 35, department: 'Sales', salary: 75000 },
      {
        name: 'Carol Williams',
        age: 32,
        department: 'Marketing',
        salary: 70000,
      },
      {
        name: 'David Brown',
        age: 29,
        department: 'Engineering',
        salary: 88000,
      },
      { name: 'Emma Davis', age: 31, department: 'HR', salary: 65000 },
      {
        name: 'Frank Miller',
        age: 40,
        department: 'Management',
        salary: 110000,
      },
      {
        name: 'Grace Taylor',
        age: 27,
        department: 'Engineering',
        salary: 92000,
      },
      { name: 'Henry Anderson', age: 38, department: 'Sales', salary: 78000 },
    ];
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onSelectionChanged() {
    this.selectedRows = this.gridApi?.getSelectedRows();
  }

  selectAll() {
    this.gridApi?.selectAll();
  }

  deselectAll() {
    this.gridApi?.deselectAll();
  }

  deleteSelected() {
    const selectedIds = this.selectedRows.map((r, i) => i);
    this.rowData = this.rowData.filter(
      (row, index) => !selectedIds.includes(index),
    );
  }

  getSelectedCount(): number {
    return this.selectedRows?.length || 0;
  }

  getTotalSalary(): number {
    return (
      this.selectedRows?.reduce((sum, row) => sum + (row.salary || 0), 0) || 0
    );
  }
}
