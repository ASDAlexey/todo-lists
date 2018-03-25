import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LayoutsModule } from './layouts/layouts.module';
import { ListsModule } from './lists/lists.module';
import { MobileDetectDirective } from './shared/directives/mobile-detect.directive';
import { RequestService } from './shared/services/request.service';

export function getLocalStorage() {
  return (typeof window !== 'undefined') ? window.localStorage : null;
}

@NgModule({
  declarations: [
    AppComponent,
    MobileDetectDirective,
  ],
  imports: [
    ToastrModule.forRoot({ timeOut: 1500, preventDuplicates: true }),
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    LayoutsModule,
    ListsModule,
  ],
  providers: [
    RequestService,
    { provide: 'LocalStorage', useFactory: getLocalStorage },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
