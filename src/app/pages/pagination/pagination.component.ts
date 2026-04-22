import { Component } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  gridApi: any;
  gridColumnApi: any;
  rowData: any[] = [];
  columnDefs: any[] = [];
  pageSize: number = 10;

  constructor() {
    this.initializeGrid();
  }

  initializeGrid() {
    this.columnDefs = [
      { headerName: 'ID', field: 'id', width: 80 },
      { headerName: 'Name', field: 'name', width: 150 },
      { headerName: 'Age', field: 'age', width: 100 },
      { headerName: 'Department', field: 'department', width: 150 },
      { headerName: 'Email', field: 'email', width: 200 },
    ];

    // Generate 100 rows of sample data
    this.rowData = this.generateData(100);
  }

  generateData(count: number) {
    const departments = [
      'Engineering',
      'Sales',
      'Marketing',
      'HR',
      'Finance',
      'Management',
    ];
    const firstNames = [
      'Alice',
      'Bob',
      'Carol',
      'David',
      'Emma',
      'Frank',
      'Grace',
      'Henry',
      'Ivy',
      'Jack',
    ];
    const lastNames = [
      'Johnson',
      'Smith',
      'Williams',
      'Brown',
      'Davis',
      'Miller',
      'Taylor',
      'Anderson',
      'Thomas',
      'Jackson',
    ];

    const data = [];
    for (let i = 1; i <= count; i++) {
      data.push({
        id: i,
        name:
          firstNames[i % firstNames.length] +
          ' ' +
          lastNames[i % lastNames.length],
        age: 20 + (i % 40),
        department: departments[i % departments.length],
        email: `user${i}@example.com`,
      });
    }
    return data;
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.paginationGoToPage(0);
  }

  updatePageSize() {
    this.gridApi?.paginationSetPageSize(parseInt(this.pageSize.toString()));
  }

  nextPage() {
    this.gridApi?.paginationGoToNextPage();
  }

  previousPage() {
    this.gridApi?.paginationGoToPreviousPage();
  }

  firstPage() {
    this.gridApi?.paginationGoToPage(0);
  }

  lastPage() {
    const totalPages = this.gridApi?.paginationGetTotalPages();
    this.gridApi?.paginationGoToPage(totalPages - 1);
  }

  getGridOptions() {
    return {
      pagination: true,
      paginationPageSize: this.pageSize,
      paginationAutoPageSize: false,
      cacheBlockSize: this.pageSize,
    };
  }
}
