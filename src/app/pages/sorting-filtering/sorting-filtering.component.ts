import { Component } from '@angular/core';

@Component({
  selector: 'app-sorting-filtering',
  templateUrl: './sorting-filtering.component.html',
  styleUrls: ['./sorting-filtering.component.scss'],
})
export class SortingFilteringComponent {
  gridApi: any;
  gridColumnApi: any;
  valueFormatter: (params: any) => '$' + params.value?.toLocaleString(),
    columnDefs: any[] = [];
filterText: string = '';

constructor() {
  this.initializeGrid();
}

initializeGrid() {
  this.columnDefs = [
    {
      headerName: 'Name',
      field: 'name',
      width: 150,
      sortable: true,
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Age',
      field: 'age',
      width: 100,
      sortable: true,
      filter: 'agNumberColumnFilter',
      type: 'numericColumn',
    },
    {
      headerName: 'Department',
      field: 'department',
      width: 150,
      sortable: true,
      filter: 'agSetColumnFilter',
    },
    {
      headerName: 'Salary',
      field: 'salary',
      width: 130,
      type: 'numericColumn',
      sortable: true,
      filter: 'agNumberColumnFilter',
      valueFormatter: (params) => '$' + params.value?.toLocaleString(),
    },
    {
      headerName: 'Status',
      field: 'status',
      width: 120,
      sortable: true,
      filter: 'agSetColumnFilter',
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
    {
      name: 'Frank Miller',
      age: 40,
      department: 'Management',
      salary: 110000,
      status: 'Active',
    },
    {
      name: 'Grace Taylor',
      age: 27,
      department: 'Engineering',
      salary: 92000,
      status: 'Active',
    },
    {
      name: 'Henry Anderson',
      age: 38,
      department: 'Sales',
      salary: 78000,
      status: 'Inactive',
    },
    {
      name: 'Ivy Thomas',
      age: 26,
      department: 'Engineering',
      salary: 85000,
      status: 'Active',
    },
    {
      name: 'Jack Jackson',
      age: 33,
      department: 'Finance',
      salary: 82000,
      status: 'Active',
    },
  ];
}

onGridReady(params: any) {
  this.gridApi = params.api;
  this.gridColumnApi = params.columnApi;
}

// Clear all filters
clearFilters() {
  this.gridApi?.setFilterModel(null);
}

// Sort by salary descending
sortBySalaryDesc() {
  this.gridColumnApi?.getColumn('salary')?.setSort('desc');
}

// Sort by age ascending
sortByAgeAsc() {
  this.gridColumnApi?.getColumn('age')?.setSort('asc');
}

// Clear sort
clearSort() {
  this.gridColumnApi?.getColumn('name')?.setSort(null);
  this.gridColumnApi?.getColumn('age')?.setSort(null);
  this.gridColumnApi?.getColumn('salary')?.setSort(null);
}

// Filter for Engineering department
filterEngineering() {
  const filterModel = {
    department: {
      type: 'set',
      values: ['Engineering'],
    },
  };
  this.gridApi?.setFilterModel(filterModel);
}

// Filter for salary > 80000
filterHighSalary() {
  const filterModel = {
    salary: {
      type: 'numberFilter',
      operator: 'greaterThan',
      value: 80000,
    },
  };
  this.gridApi?.setFilterModel(filterModel);
}
}
