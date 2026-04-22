import { Component } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.scss'],
})
export class DataBindingComponent {
  gridApi: any;
  gridColumnApi: any;
  rowData: any[] = [];
  columnDefs: any[] = [];
  newName: string = '';
  newAge: string = '';

  constructor() {
    this.initializeGrid();
  }

  initializeGrid() {
    this.columnDefs = [
      { headerName: 'ID', field: 'id', width: 80 },
      { headerName: 'Name', field: 'name', width: 150 },
      { headerName: 'Age', field: 'age', width: 100 },
      { headerName: 'Department', field: 'department', width: 150 },
      { headerName: 'Status', field: 'status', width: 120 },
    ];

    this.rowData = [
      {
        id: 1,
        name: 'Alice Johnson',
        age: 28,
        department: 'Engineering',
        status: 'Active',
      },
      {
        id: 2,
        name: 'Bob Smith',
        age: 35,
        department: 'Sales',
        status: 'Active',
      },
      {
        id: 3,
        name: 'Carol Williams',
        age: 32,
        department: 'Marketing',
        status: 'Active',
      },
      {
        id: 4,
        name: 'David Brown',
        age: 29,
        department: 'Engineering',
        status: 'Inactive',
      },
      {
        id: 5,
        name: 'Emma Davis',
        age: 31,
        department: 'HR',
        status: 'Active',
      },
    ];
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  // Add new row
  addNewRow() {
    if (this.newName && this.newAge) {
      const newId = (this.rowData[this.rowData.length - 1]?.id || 0) + 1;
      const newRow = {
        id: newId,
        name: this.newName,
        age: parseInt(this.newAge),
        department: 'New',
        status: 'Active',
      };

      const newRowData = [...this.rowData, newRow];
      this.rowData = newRowData;
      this.newName = '';
      this.newAge = '';
    }
  }

  // Update a row by ID
  updateRow(id: number, updates: any) {
    this.rowData = this.rowData.map((row) =>
      row.id === id ? { ...row, ...updates } : row,
    );
  }

  // Delete a row
  deleteRow(id: number) {
    this.rowData = this.rowData.filter((row) => row.id !== id);
  }

  // Clear all data
  clearData() {
    this.rowData = [];
  }

  // Reload sample data
  reloadData() {
    this.initializeGrid();
  }

  // Update all data at once
  updateAllData() {
    const updatedData = this.rowData.map((row) => ({
      ...row,
      status: row.age > 30 ? 'Senior' : 'Junior',
    }));
    this.rowData = updatedData;
  }
}
