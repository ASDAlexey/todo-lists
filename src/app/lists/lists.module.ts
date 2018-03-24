import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ListDetailsComponent } from './list-details/list-details.component';
import { ListItemsComponent } from './list-items/list-items.component';
import { ListService } from './list.service';
import { ListsRoutingModule } from './lists-routing.module';
import { SharedModule } from '../shared/shared.module';

const modules = [
  CommonModule,
  ListsRoutingModule,
  SharedModule,
];

const services = [
  ListService,
];

const components = [
  ListItemsComponent,
  ListDetailsComponent,
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    ...modules,
  ],
  providers: [
    ...services,
  ],
})
export class ListsModule {

}
