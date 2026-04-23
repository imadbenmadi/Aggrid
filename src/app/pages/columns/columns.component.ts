import { Component } from '@angular/core';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss'],
})
export class ColumnsComponent {
  gridApi: any;
  gridColumnApi: any;
  rowData: any[] = [];
  columnDefs: any[] = [];
  selectedAlignment: string = 'center';

  constructor() {
    this.initializeGrid();
  }

  initializeGrid() {
    // Define columns with various properties
    this.columnDefs = [
      {
        headerName: 'ID',
        field: 'id',
        width: 80,
        pinned: 'left',
        filter : 'agNumberColumnFilter',
        cellStyle: { 'font-weight': 'bold' },
      },
      {
        headerName: 'Name',
        pinned: 'right',
        field: 'name',
        width: 200,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Age',
        field: 'age',
        width: 100,
        filter: 'agNumberColumnFilter',
        type: 'numericColumn',
      },
      {
        headerName: 'Department',
        field: 'department',
        width: 150,
        filter: 'agSetColumnFilter',
      },
      {
        headerName: 'Salary',
        field: 'salary',
        width: 130,
        type: 'numericColumn',
        cellStyle: { color: '#0066cc', 'font-weight': 'bold' },
        valueFormatter: (params: any) => '$' + params.value?.toLocaleString(),
      },
      {
        headerName: 'Status',
        field: 'status',
        width: 120,
        cellStyle: (params: any) => ({
          'background-color': params.value === 'Active' ? '#d4edda' : '#f8d7da',
          'text-align': 'center',
        }),
      },
      {
        headerName: 'Email',
        field: 'email',
        width: 200,
        hide: false,
        // suppressSizeToFit : false,
      },
    ];

    this.rowData = [
      {
        id: 1,
        name: 'Alice Johnson',
        age: 28,
        department: 'Engineering',
        salary: 95000,
        status: 'Active',
        email: 'alice@example.com',
      },
      {
        id: 2,
        name: 'Bob Smith',
        age: 35,
        department: 'Sales',
        salary: 75000,
        status: 'Active',
        email: 'bob@example.com',
      },
      {
        id: 3,
        name: 'Carol Williams',
        age: 32,
        department: 'Marketing',
        salary: 70000,
        status: 'Inactive',
        email: 'carol@example.com',
      },
      {
        id: 4,
        name: 'David Brown',
        age: 29,
        department: 'Engineering',
        salary: 88000,
        status: 'Active',
        email: 'david@example.com',
      },
      {
        id: 5,
        name: 'Emma Davis',
        age: 31,
        department: 'HR',
        salary: 65000,
        status: 'Active',
        email: 'emma@example.com',
      },
      {
        id: 6,
        name: 'Frank Miller',
        age: 40,
        department: 'Management',
        salary: 110000,
        status: 'Active',
        email: 'frank@example.com',
      },
      {
        id: 7,
        name: 'Grace Taylor',
        age: 27,
        department: 'Engineering',
        salary: 92000,
        status: 'Active',
        email: 'grace@example.com',
      }, {
        id: 7,
        name: 'Grace Taylor',
        age: 27,
        department: 'Engineering',
        salary: 92000,
        status: 'Active',
        email: 'grace@example.com',
      }, {
        id: 7,
        name: 'Grace Taylor',
        age: 27,
        department: 'Engineering',
        salary: 92000,
        status: 'Active',
        email: 'grace@example.com',
      }, {
        id: 7,
        name: 'Grace Taylor',
        age: 27,
        department: 'Engineering',
        salary: 92000,
        status: 'Active',
        email: 'grace@example.com',
      }, {
        id: 7,
        name: 'Grace Taylor',
        age: 27,
        department: 'Engineering',
        salary: 92000,
        status: 'Active',
        email: 'grace@example.com',
      }, {
        id: 7,
        name: 'Grace Taylor',
        age: 27,
        department: 'Engineering',
        salary: 92000,
        status: 'Active',
        email: 'grace@example.com',
      }, {
        id: 7,
        name: 'Grace Taylor',
        age: 27,
        department: 'Engineering',
        salary: 92000,
        status: 'Active',
        email: 'grace@example.com',
      }, {
        id: 7,
        name: 'Grace Taylor',
        age: 27,
        department: 'Engineering',
        salary: 92000,
        status: 'Active',
        email: 'grace@example.com',
      }, {
        id: 7,
        name: 'Grace Taylor',
        age: 27,
        department: 'Engineering',
        salary: 92000,
        status: 'Active',
        email: 'grace@example.com',
      }, {
        id: 7,
        name: 'Grace Taylor',
        age: 27,
        department: 'Engineering',
        salary: 92000,
        status: 'Active',
        email: 'grace@example.com',
      }, {
        id: 7,
        name: 'Grace Taylor',
        age: 27,
        department: 'Engineering',
        salary: 92000,
        status: 'Active',
        email: 'grace@example.com',
      }, {
        id: 7,
        name: 'Grace Taylor',
        age: 27,
        department: 'Engineering',
        salary: 92000,
        status: 'Active',
        email: 'grace@example.com',
      }, {
        id: 7,
        name: 'Grace Taylor',
        age: 27,
        department: 'Engineering',
        salary: 92000,
        status: 'Active',
        email: 'grace@example.com',
      }, {
        id: 7,
        name: 'Grace Taylor',
        age: 27,
        department: 'Engineering',
        salary: 92000,
        status: 'Active',
        email: 'grace@example.com',
      }, {
        id: 7,
        name: 'Grace Taylor',
        age: 27,
        department: 'Engineering',
        salary: 92000,
        status: 'Active',
        email: 'grace@example.com',
      },
    ];
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  autoSizeColumns() {
    this.gridColumnApi?.autoSizeAllColumns();
  }

  resetColumns() {
    this.gridColumnApi?.resetColumnState();
  }
}
