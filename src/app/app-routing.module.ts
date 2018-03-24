import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ListsModule } from './lists/lists.module';

const appRoutes: Routes = [
  { path: 'lists', loadChildren: './lists/lists.module#ListsModule' },

  // Handle all other routes
  { path: '**', redirectTo: '/lists' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
