import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LayoutsModule } from './layouts/layouts.module';
import { ListsModule } from './lists/lists.module';
import { MobileDetectDirective } from './shared/directives/mobile-detect.directive';
import { RequestService } from './shared/services/request.service';

@NgModule({
  declarations: [
    AppComponent,
    MobileDetectDirective,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    LayoutsModule,
    ListsModule,
  ],
  providers: [
    RequestService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
