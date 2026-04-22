import { Component } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent {
  gridApi: any;
  gridColumnApi: any;
  rowData: any[] = [];
  columnDefs: any[] = [];
  defaultColDef: any = { sortable: true, filter: true, resizable: true };
  eventLog: string[] = [];
  maxLogEntries: number = 20;

  constructor() {
    this.initializeGrid();
  }

  initializeGrid() {
    this.columnDefs = [
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
    ];
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.addLog('Grid initialized');
  }

  onRowClicked(event: any) {
    this.addLog(`Row clicked: ${event.data?.name}`);
  }

  onCellClicked(event: any) {
    this.addLog(`Cell clicked: ${event.colDef?.headerName} = ${event.value}`);
  }

  onCellDoubleClicked(event: any) {
    this.addLog(`Cell double-clicked: ${event.colDef?.headerName}`);
  }

  onSelectionChanged(event: any) {
    const count = this.gridApi?.getSelectedRows()?.length || 0;
    this.addLog(`Selection changed: ${count} row(s) selected`);
  }

  onSortChanged(event: any) {
    const model = this.gridColumnApi?.getColumnState();
    const sortedCols = model
      ?.filter((col: any) => col.sort)
      ?.map((col: any) => `${col.colId}:${col.sort}`)
      .join(', ');
    this.addLog(`Sort changed: ${sortedCols || 'None'}`);
  }

  onFilterChanged(event: any) {
    const model = this.gridApi?.getFilterModel();
    const filterKeys = Object.keys(model || {});
    this.addLog(`Filter changed: ${filterKeys.length} active filter(s)`);
  }

  onPaginationChanged(event: any) {
    const currentPage = this.gridApi?.paginationGetCurrentPage();
    this.addLog(`Pagination changed: page ${(currentPage || 0) + 1}`);
  }

  onFirstDataRendered(event: any) {
    this.addLog('First data rendered');
  }

  addLog(message: string) {
    const timestamp = new Date().toLocaleTimeString();
    this.eventLog.unshift(`[${timestamp}] ${message}`);
    if (this.eventLog.length > this.maxLogEntries) {
      this.eventLog.pop();
    }
  }

  clearLog() {
    this.eventLog = [];
  }
}
