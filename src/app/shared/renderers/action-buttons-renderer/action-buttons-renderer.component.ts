import { Component } from '@angular/core';

@Component({
  selector: 'app-action-buttons-renderer',
  template: `
    <div class="action-buttons">
      <button class="btn btn-sm btn-primary" (click)="onEdit()" title="Edit">
        Edit
      </button>
      <button class="btn btn-sm btn-danger" (click)="onDelete()" title="Delete">
        Delete
      </button>
    </div>
  `,
  styles: [
    `
      .action-buttons {
        display: flex;
        gap: 0.5rem;
      }

      .btn {
        padding: 0.25rem 0.5rem;
        font-size: 0.75rem;
        border: none;
        border-radius: 0.25rem;
        cursor: pointer;
        color: white;
      }

      .btn-primary {
        background-color: #007bff;
      }

      .btn-primary:hover {
        background-color: #0056b3;
      }

      .btn-danger {
        background-color: #dc3545;
      }

      .btn-danger:hover {
        background-color: #c82333;
      }
    `,
  ],
})
export class ActionButtonsRendererComponent {
  params: any;

  agInit(params: any) {
    this.params = params;
  }

  onEdit() {
    alert(`Edit: ${this.params?.data?.name}`);
  }

  onDelete() {
    alert(`Delete: ${this.params?.data?.name}`);
  }

  refresh() {
    return true;
  }
}
