import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent, FirstDataRenderedEvent, IRowNode } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';

export interface RowData extends Record<string, any> {
  id: number;
  salary: number;
}

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss'],
})
export class SelectionComponent implements OnInit {
  private gridApi!: GridApi;
  public rowData: RowData[] = [];
  public selectedRows: RowData[] = [];


  public columnDefs: ColDef[] = [];
  public selectedCount = 0;
  public totalSalary = 0;
  public loading = true;
  public error = '';

  public getRowId = (params: any) => params.data.id.toString();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadData();
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.gridApi.autoSizeAllColumns(); // columnApi is gone in AG Grid v28+
  }
  private loadData(): void {
    this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe({
        next: (data) => {
          const dataWithIds = data.map((item, index) => ({ id: index + 1, ...item }));

          // Build columns only once
          this.columnDefs = [
            {
              headerName: '',
              field: 'checkbox',
              width: 50,
              checkboxSelection: true,
              headerCheckboxSelection: true,
              pinned: 'left' as const,
            },
            ...Object.keys(dataWithIds[0]).map(key => ({
              headerName: key.charAt(0).toUpperCase() + key.slice(1),
              field: key,
              sortable: true,
              filter: true,
            }))
          ];

          this.rowData = dataWithIds;
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.error = 'Failed to load data.';
          this.loading = false;
        }
      });
  }


  onFirstDataRendered(_params: FirstDataRenderedEvent): void {
    const savedRows: RowData[] = JSON.parse(localStorage.getItem('selectedRows') || '[]');
    if (!savedRows.length) return;

    const savedIds = new Set(savedRows.map(r => r.id.toString()));

    this.gridApi.forEachNode((node: IRowNode) => {
      if (node.data && savedIds.has(node.data.id.toString())) {
        node.setSelected(true);
      }
    });
    this.totalSalary = this.selectedRows.reduce((sum, row) => sum + (row.salary || 0), 0);
  }

  onSelectionChanged(): void {
    this.selectedRows = this.gridApi.getSelectedRows();
    // Compute once here, bind as properties in template — no per-cycle recalculation
    this.selectedCount = this.selectedRows.length;
    this.totalSalary = this.selectedRows.reduce((sum, row) => sum + (row.salary || 0), 0);
    localStorage.setItem('selectedRows', JSON.stringify(this.selectedRows));
  }

  deleteSelected(): void {
    const selectedIds = new Set(this.selectedRows.map(r => r.id));
    this.rowData = this.rowData.filter(row => !selectedIds.has(row.id));
    // Clear state after deletion
    this.selectedRows = [];
    this.selectedCount = 0;
    this.totalSalary = 0;
    localStorage.removeItem('selectedRows');
  }

  selectAll(): void {
    this.gridApi.selectAll();
  }

  deselectAll(): void {
    this.gridApi.deselectAll();
  }
  getSelectedCount(): number {
    return this.selectedCount;
  }
  getTotalSalary(): number {
    return this.totalSalary;
  }
  public rowSelection: 'multiple' = 'multiple';
  public suppressRowClickSelection = true;

  onRowClicked(params: any): void {
    const mouseEvent = params.event;

    // Identify if the click was specifically on the checkbox element
    const isCheckboxClick = mouseEvent.target.closest('.ag-selection-checkbox');

    if (!isCheckboxClick) {
      // SCENARIO: User clicked the ROW (not the checkbox)
      // We want to ADD this row to the selection without removing others
      params.node.setSelected(true, false);
    } else {
      // SCENARIO: User clicked the CHECKBOX
      // If it's already selected, we want to UNSELECT it.
      // Note: Since suppressRowClickSelection is true, we handle the toggle manually
      const isSelected = params.node.isSelected();
      params.node.setSelected(!isSelected);
    }
  }
}
