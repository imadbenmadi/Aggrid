import { Component } from '@angular/core';

@Component({
  selector: 'app-editing',
  templateUrl: './editing.component.html',
  styleUrls: ['./editing.component.scss'],
})
export class EditingComponent {
  gridApi: any;
  gridColumnApi: any;
  rowData: any[] = [];
  columnDefs: any[] = [];

  constructor() {
    this.initializeGrid();
  }

  initializeGrid() {
    this.columnDefs = [
      { headerName: 'Name', field: 'name', width: 150, editable: true },
      {
        headerName: 'Age',
        field: 'age',
        width: 100,
        editable: true,
        type: 'numericColumn',
      },
      {
        headerName: 'Department',
        field: 'department',
        width: 150,
        editable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: [
            'Engineering',
            'Sales',
            'Marketing',
            'HR',
            'Finance',
            'Management',
          ],
        },
      },
      {
        headerName: 'Salary',
        field: 'salary',
        width: 130,
        editable: true,
        type: 'numericColumn',
      },
      {
        headerName: 'Status',
        field: 'status',
        width: 120,
        editable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['Active', 'Inactive', 'On Leave'],
        },
      },
    ];

    this.rowData = [
      {
        name: 'Alice Johnson',
        age: 28,
        department: 'Engineering',
        salary: 95000,
        status: 'Active',
      },
      {
        name: 'Bob Smith',
        age: 35,
        department: 'Sales',
        salary: 75000,
        status: 'Active',
      },
      {
        name: 'Carol Williams',
        age: 32,
        department: 'Marketing',
        salary: 70000,
        status: 'Inactive',
      },
      {
        name: 'David Brown',
        age: 29,
        department: 'Engineering',
        salary: 88000,
        status: 'Active',
      },
      {
        name: 'Emma Davis',
        age: 31,
        department: 'HR',
        salary: 65000,
        status: 'Active',
      },
    ];
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onCellValueChanged(event: any) {
    console.log('Cell edited:', event.data);
  }

  startEditing() {
    this.gridApi?.startEditingCell({
      rowIndex: 0,
      colKey: 'name',
    });
  }

  stopEditing() {
    this.gridApi?.stopEditing();
  }
}
