import { Component } from '@angular/core';

@Component({
  selector: 'app-status-renderer',
  template: `<span [ngClass]="statusClass">{{ params.value }}</span>`,
  styles: [
    `
      span {
        padding: 0.35rem 0.65rem;
        border-radius: 0.25rem;
        font-size: 0.875rem;
        font-weight: 500;
      }

      .badge-success {
        background-color: #28a745;
        color: white;
      }

      .badge-danger {
        background-color: #dc3545;
        color: white;
      }

      .badge-warning {
        background-color: #ffc107;
        color: black;
      }
    `,
  ],
})
export class StatusRendererComponent {
  params: any;
  statusClass: string = '';

  agInit(params: any) {
    this.params = params;
    this.updateStatusClass();
  }

  refresh() {
    this.updateStatusClass();
    return true;
  }

  private updateStatusClass() {
    const status = this.params?.value;
    if (status === 'Active') {
      this.statusClass = 'badge-success';
    } else if (status === 'Inactive') {
      this.statusClass = 'badge-danger';
    } else if (status === 'Pending') {
      this.statusClass = 'badge-warning';
    }
  }
}
