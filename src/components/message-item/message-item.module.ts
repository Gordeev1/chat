import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MessageItemComponent } from './message-item';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
	declarations: [
		MessageItemComponent
	],
	imports: [
		PipesModule,
		IonicModule
	],
	exports: [
		MessageItemComponent
	]
})
export class MessageItemComponentModule { }
