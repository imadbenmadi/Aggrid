import { Component } from '@angular/core';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss'],
})
export class ThemesComponent {
  gridApi: any;
  gridColumnApi: any;
  rowData: any[] = [];
  columnDefs: any[] = [];
  defaultColDef: any = { sortable: true, filter: true, resizable: true };
  currentTheme: string = 'ag-theme-alpine';
  availableThemes = [
    { id: 'ag-theme-alpine', label: 'Alpine' },
    { id: 'ag-theme-alpine-dark', label: 'Alpine Dark' },
    { id: 'ag-theme-balham', label: 'Balham Theme' },
    { id: 'ag-theme-balham-dark', label: 'Balham Dark' },
    { id: 'ag-theme-material', label: 'Material Theme' },
  ];

  constructor() {
    this.initializeGrid();
  }

  initializeGrid() {
    this.columnDefs = [
      { headerName: 'Name', field: 'name', width: 150 },
      { headerName: 'Age', field: 'age', width: 100 },
      { headerName: 'Department', field: 'department', width: 150 },
      {
        headerName: 'Salary',
        field: 'salary',
        width: 130,
        valueFormatter: (params: any) => '$' + params.value?.toLocaleString(),
      },
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
    ];
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  switchTheme(themeId: string) {
    this.currentTheme = themeId;
  }

  isThemeActive(themeId: string): boolean {
    return this.currentTheme === themeId;
  }
}
