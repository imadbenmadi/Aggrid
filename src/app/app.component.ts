import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'AG Grid Learning Platform';

  constructor() { }

  navItems = [
    { label: 'Home', route: '/' },
    { label: 'Full Example', route: '/full-example' },
    { label: 'Basic Grid', route: '/basic-grid' },
    { label: 'Columns', route: '/columns' },
    { label: 'Data Binding', route: '/data-binding' },
    { label: 'Sorting & Filtering', route: '/sorting-filtering' },
    { label: 'Pagination', route: '/pagination' },
    { label: 'Selection', route: '/selection' },
    { label: 'Editing', route: '/editing' },
    { label: 'Grouping', route: '/grouping' },
    { label: 'Master/Detail', route: '/master-detail' },
    { label: 'Events', route: '/events' },
    { label: 'Custom Renderers', route: '/custom-renderers' },
    { label: 'Themes', route: '/themes' },
  ];
}
