import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './components/button/button.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { InputComponent } from './components/input/input.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { ReplacePipe } from './pipes/replace.pipe';
import { SharedConstants } from './shared.constant';
import { RadioComponent } from './components/radio/radio.component';

const modules = [
  FormsModule,
  CommonModule,
  ReactiveFormsModule,
];

const services = [
  SharedConstants,
];

const pipes = [
  ReplacePipe,
];

const components = [
  InputComponent,
  CheckboxComponent,
  RadioComponent,
  ButtonComponent,
  PreloaderComponent,
];


@NgModule({
  declarations: [...components, ...pipes],
  imports: [...modules],
  providers: [...services],
  exports: [...modules, ...components, ...pipes],
})
export class SharedModule {
}
