import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    BlankLayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
    BlankLayoutComponent,
  ],
})

export class LayoutsModule {
}
