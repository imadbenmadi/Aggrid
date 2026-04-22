import { Component } from '@angular/core';
import { ProfilePictureRendererComponent } from '../../shared/renderers/profile-picture-renderer/profile-picture-renderer.component';
import { ActionButtonsRendererComponent } from '../../shared/renderers/action-buttons-renderer/action-buttons-renderer.component';
import { StatusRendererComponent } from '../../shared/renderers/status-renderer/status-renderer.component';

@Component({
  selector: 'app-custom-renderers',
  templateUrl: './custom-renderers.component.html',
  styleUrls: ['./custom-renderers.component.scss']
})
export class CustomRenderersComponent {

  gridApi: any;
  gridColumnApi: any;
  rowData: any[] = [];
  columnDefs: any[] = [];

  constructor() {
    this.initializeGrid();
  }

  initializeGrid() {
    this.columnDefs = [
      {
        headerName: 'Profile',
        field: 'profile',
        cellRenderer: ProfilePictureRendererComponent,
        width: 100
      },
      { headerName: 'Name', field: 'name', width: 150 },
      { headerName: 'Email', field: 'email', width: 200 },
      {
        headerName: 'Status',
        field: 'status',
        cellRenderer: StatusRendererComponent,
        width: 120
      },
      {
        headerName: 'Actions',
        field: 'actions',
        cellRenderer: ActionButtonsRendererComponent,
        width: 150,
        sortable: false,
        filter: false
      }
    ];

    this.rowData = [
      {
        profile: 'Alice',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        status: 'Active'
      },
      {
        profile: 'Bob',
        name: 'Bob Smith',
        email: 'bob@example.com',
        status: 'Active'
      },
      {
        profile: 'Carol',
        name: 'Carol Williams',
        email: 'carol@example.com',
        status: 'Inactive'
      },
      {
        profile: 'David',
        name: 'David Brown',
        email: 'david@example.com',
        status: 'Pending'
      }
    ];
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
}
