import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ColDef, GridReadyEvent } from 'ag-grid-community';

// 1. Interface moved outside the class
export interface Datatyping {
  id: number;
  name: string;
  age: number;
  department: string;
  salary: number;
  status: string;
}

@Component({
  selector: 'app-sorting-filtering',
  templateUrl: './sorting-filtering.component.html',
  styleUrls: ['./sorting-filtering.component.scss'],
})
export class SortingFilteringComponent implements OnInit {
  private gridApi: any;

  // 2. Use any[] if the API response is unpredictable
  public rowData$ = new BehaviorSubject<any[]>([]);
  public columnDefs: ColDef[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.initializeGrid();
    this.fetchData();
  }
  defaultColDef : ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true
  }
  initializeGrid() {
    this.columnDefs = [
      {
        headerName: 'Name',
        field: 'athlete', // Changed from 'name' to 'athlete'
        width: 150
      },
      {
        headerName: 'Age',
        field: 'age',
        width: 100
      },
      {
        headerName: 'Sport',
        field: 'sport', // Changed from 'department' to 'sport'
        width: 150
      },
      {
        headerName: 'Total Medals',
        field: 'total', // Changed from 'salary' to 'total'
        width: 130
      }
    ];
    // this.columnDefs = [

    //   { headerName: 'Name', field: 'name', width: 150, sortable: true, filter: 'agTextColumnFilter' },
    //   { headerName: 'Age', field: 'age', width: 100, sortable: true, filter: 'agNumberColumnFilter' },
    //   { headerName: 'Department', field: 'department', width: 150, sortable: true, filter: 'agTextColumnFilter' },
    //   {
    //     headerName: 'Salary',
    //     field: 'salary',
    //     width: 130,
    //     sortable: true,
    //     filter: 'agNumberColumnFilter',
    //     valueFormatter: (params) => params.value ? '$' + params.value.toLocaleString() : ''
    //   },
    //   { headerName: 'Status', field: 'status', width: 120, sortable: true, filter: 'agTextColumnFilter' },
    // ];
  }

  fetchData() {
    // 3. Since we use BehaviorSubject, we .subscribe() and then .next() the results
    this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe({
        next: (data) => this.rowData$.next(data),
        error: (err) => console.error('Failed to fetch data', err)
      });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  // --- Grid Controls ---

  clearFilters() {
    this.gridApi?.setFilterModel(null);
  }
  clearSort() {
    this.gridApi?.applyColumnState({
      state: [],
      defaultState: { sort: null },
    });
  }
  sortByAgeAsc() {
    this.gridApi?.applyColumnState({
      state: [{ colId: 'age', sort: 'asc' }],
      defaultState: { sort: null },
    });
  }
  filterHighSalary() {
    this.gridApi?.setFilterModel({
      salary: { filterType: 'number', type: 'greaterThan', filter: 50000 },
    });
  }
  sortBySalaryDesc() {
    this.gridApi?.applyColumnState({
      state: [{ colId: 'salary', sort: 'desc' }],
      defaultState: { sort: null },
    });
  }

  filterEngineering() {
    this.gridApi?.setFilterModel({
      department: { filterType: 'text', type: 'contains', filter: 'Engineering' },
    });
  }
}
