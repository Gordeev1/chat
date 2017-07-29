import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ChatItemComponent } from './chat-item';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
	declarations: [
		ChatItemComponent
	],
	imports: [
		PipesModule,
		IonicModule
	],
	exports: [
		ChatItemComponent
	]
})
export class ChatItemComponentModule { }
