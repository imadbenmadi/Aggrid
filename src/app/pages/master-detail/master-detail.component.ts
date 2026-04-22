import { Component } from '@angular/core';

@Component({
  selector: 'app-master-detail',
  templateUrl: './master-detail.component.html',
  styleUrls: ['./master-detail.component.scss'],
})
export class MasterDetailComponent {
  gridApi: any;
  gridColumnApi: any;
  rowData: any[] = [];
  columnDefs: any[] = [];
  detailGridOptions: any;
  detailCellRendererParams: any;

  constructor() {
    this.initializeGrid();
    this.detailGridOptions = {
      columnDefs: [
        { headerName: 'Skill', field: 'skill', width: 150 },
        { headerName: 'Level', field: 'level', width: 100 },
      ],
      rowData: null,
      domLayout: 'autoHeight',
    };

    this.detailCellRendererParams = {
      detailGridOptions: this.detailGridOptions,
      getDetailRowData: this.getDetailRowData,
    };
  }

  initializeGrid() {
    this.columnDefs = [
      { headerName: 'Name', field: 'name', width: 150 },
      { headerName: 'Department', field: 'department', width: 150 },
      { headerName: 'Email', field: 'email', width: 200 },
      { headerName: 'Skills Count', field: 'skillCount', width: 120 },
    ];

    this.rowData = [
      {
        name: 'Alice Johnson',
        department: 'Engineering',
        email: 'alice@example.com',
        skillCount: 5,
        skills: [
          { skill: 'Angular', level: 'Expert' },
          { skill: 'TypeScript', level: 'Expert' },
          { skill: 'React', level: 'Intermediate' },
          { skill: 'Node.js', level: 'Intermediate' },
          { skill: 'SQL', level: 'Beginner' },
        ],
      },
      {
        name: 'Bob Smith',
        department: 'Sales',
        email: 'bob@example.com',
        skillCount: 3,
        skills: [
          { skill: 'Negotiations', level: 'Expert' },
          { skill: 'CRM', level: 'Expert' },
          { skill: 'Data Analysis', level: 'Intermediate' },
        ],
      },
      {
        name: 'Carol Williams',
        department: 'Marketing',
        email: 'carol@example.com',
        skillCount: 4,
        skills: [
          { skill: 'Social Media', level: 'Expert' },
          { skill: 'Content Writing', level: 'Expert' },
          { skill: 'Graphic Design', level: 'Intermediate' },
          { skill: 'SEO', level: 'Beginner' },
        ],
      },
    ];
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  isExternalFilterPresent() {
    return false;
  }

  doesExternalFilterPass() {
    return true;
  }

  getDetailRowData = (params: any) => {
    params.successCallback(params.data.skills);
  };
}
