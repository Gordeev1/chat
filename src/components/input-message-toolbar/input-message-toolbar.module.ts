import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { InputMessageToolbarComponent } from './input-message-toolbar';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    InputMessageToolbarComponent,
  ],
  imports: [
    DirectivesModule,
    IonicModule
  ],
  exports: [
    InputMessageToolbarComponent
  ]
})
export class InputMessageToolbarComponentModule { }
