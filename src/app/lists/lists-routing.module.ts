import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlankLayoutComponent } from '../layouts/components/blank-layout/blank-layout.component';
import { LayoutsModule } from '../layouts/layouts.module';
import { ListDetailsComponent } from './list-details/list-details.component';
import { ListItemsComponent } from './list-items/list-items.component';

const listsRoutes: Routes = [{
  path: '',
  component: BlankLayoutComponent,
  children: [
    { path: '', component: ListItemsComponent },
    { path: ':id', component: ListDetailsComponent },
  ],
}];

@NgModule({
  imports: [
    RouterModule.forChild(listsRoutes),
    LayoutsModule,
  ],
  exports: [RouterModule],
})
export class ListsRoutingModule {
}
