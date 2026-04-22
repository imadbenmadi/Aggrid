import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-picture-renderer',
  template: `<div class="profile-avatar">{{ initials }}</div>`,
  styles: [
    `
      .profile-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 14px;
      }
    `,
  ],
})
export class ProfilePictureRendererComponent {
  initials: string = '';
  params: any;

  agInit(params: any) {
    this.params = params;
    this.initials = params.value?.substring(0, 2).toUpperCase() || '';
  }

  refresh() {
    return true;
  }
}
