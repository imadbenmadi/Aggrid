import { Component } from '@angular/core';
import { ColDef, GridApi, FirstDataRenderedEvent } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';

export interface RowData extends Record<string, any> {
  id: number;
  select: boolean;
  salary: number;
  [key: string]: any;
}
@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss'],
})

export class SelectionComponent {
  private gridApi!: GridApi;
  private gridcolapi: any;
  public rowData: RowData[] = [];
  public columnDefs: ColDef[] = [];
  public selectedRows: RowData[] = [];
  public loading = true;
  public Error = "";

  constructor(private http: HttpClient) {
    this.initializeGrid();
  }

  // CRITICAL: This tells AG Grid which property is the unique ID
  public getRowId = (params: any) => params.data.id.toString();

  initializeGrid() {
    this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe({
        next: (data) => {
          // 1. Inject IDs into the data
          const dataWithIds = data.map((item, index) => ({
            id: index + 1,
            ...item,

          }));

          this.rowData = dataWithIds;

          // 2. Map Columns
          const dynamicColumns: ColDef[] = Object.keys(dataWithIds[0] || {}).map(key => ({
            headerName: key.charAt(0).toUpperCase() + key.slice(1),
            field: key,
            sortable: true,
            filter: true
          }));

          this.columnDefs = [
            {
              headerName: '',
              field: 'checkbox',
              width: 50,
              checkboxSelection: true,
              headerCheckboxSelection: true,
              pinned: 'left'
            },
            ...dynamicColumns
          ];

          this.loading = false;
          setTimeout(() => {
            this.restoreSelection();
          }, 1);
        },
        error: (err) => {
          console.error(err);
          this.Error = 'Failed to load data.';
          this.loading = false;
        }
      });
  }
  restoreSelection() {
    const savedRows = JSON.parse(localStorage.getItem('selectedRows') || '[]');
    if (savedRows.length > 0 && this.gridApi) {
      const savedIds = savedRows.map((row: any) => row.id.toString());

      this.gridApi.forEachNode((node) => {
        if (node.data && savedIds.includes(node.data.id.toString())) {
          node.setSelected(true);
        }
      });
    }
  }

  // Keep this as a backup for when the grid finishes rendering
  onFirstDataRendered(params: FirstDataRenderedEvent) {
    this.restoreSelection();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridcolapi = params.columnApi;
    this.gridcolapi.autoSizeAllColumns(); // Auto-size columns after grid is ready
  }

  // This triggers once the rows are actually drawn on the screen
  // onFirstDataRendered(params: FirstDataRenderedEvent) {
  //   const savedRows = JSON.parse(localStorage.getItem('selectedRows') || '[]');
  //   if (savedRows.length > 0) {
  //     // Extract the IDs of the saved rows
  //     const savedIds = savedRows.map((row: any) => row.id.toString());

  //     // Tell the grid to select these specific nodes
  //     params.api.forEachNode((node) => {
  //       if (node.data && savedIds.includes(node.data.id.toString())) {
  //         node.setSelected(true);
  //       }
  //     });
  //   }
  // }

  onSelectionChanged() {
    this.selectedRows = this.gridApi?.getSelectedRows();
    // Persist the full row objects (including the IDs) to localStorage
    localStorage.setItem('selectedRows', JSON.stringify(this.selectedRows));
  }

  deleteSelected() {
    const selectedIds = this.selectedRows.map(row => row.id);
    // Filter by the actual ID property, not the array index
    this.rowData = this.rowData.filter(row => !selectedIds.includes(row.id));
    this.onSelectionChanged(); // Update storage after deletion
  }

  selectAll() {
    this.gridApi?.selectAll();
  }

  deselectAll() {
    this.gridApi?.deselectAll();
  }

  getSelectedCount(): number {
    return this.selectedRows?.length || 0;
  }
  getTotalSalary(): number {
    return this.selectedRows.reduce((total, row) => total + (row.salary || 0), 0);
  }
}
