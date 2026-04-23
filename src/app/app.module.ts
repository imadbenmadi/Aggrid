import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BasicGridComponent } from './pages/basic-grid/basic-grid.component';
import { ColumnsComponent } from './pages/columns/columns.component';
import { DataBindingComponent } from './pages/data-binding/data-binding.component';
import { SortingFilteringComponent } from './pages/sorting-filtering/sorting-filtering.component';
import { PaginationComponent } from './pages/pagination/pagination.component';
import { SelectionComponent } from './pages/selection/selection.component';
import { EditingComponent } from './pages/editing/editing.component';
import { GroupingComponent } from './pages/grouping/grouping.component';
import { MasterDetailComponent } from './pages/master-detail/master-detail.component';
import { EventsComponent } from './pages/events/events.component';
import { CustomRenderersComponent } from './pages/custom-renderers/custom-renderers.component';
import { ThemesComponent } from './pages/themes/themes.component';
import { FullExampleComponent } from './pages/full-example/full-example.component';
import { ProfilePictureRendererComponent } from './shared/renderers/profile-picture-renderer/profile-picture-renderer.component';
import { ActionButtonsRendererComponent } from './shared/renderers/action-buttons-renderer/action-buttons-renderer.component';
import { StatusRendererComponent } from './shared/renderers/status-renderer/status-renderer.component';
import 'ag-grid-enterprise'

import { appRoutes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BasicGridComponent,
    ColumnsComponent,
    DataBindingComponent,
    SortingFilteringComponent,
    PaginationComponent,
    SelectionComponent,
    EditingComponent,
    GroupingComponent,
    MasterDetailComponent,
    EventsComponent,
    CustomRenderersComponent,
    ThemesComponent,
    FullExampleComponent,
    ProfilePictureRendererComponent,
    ActionButtonsRendererComponent,
    StatusRendererComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AgGridModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
