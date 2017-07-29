import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { plugins } from '../plugins';
import { reducers, metaReducers } from '../reducers';
import { services } from '../services';
import { actions } from '../actions';

@NgModule({
	declarations: [
		MyApp,
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp),
		StoreModule.forRoot(reducers, { metaReducers })
	],
	bootstrap: [IonicApp],
	entryComponents: [MyApp],
	providers: [
		...actions,
		...services,
		...plugins,
		{ provide: ErrorHandler, useClass: IonicErrorHandler }
	]
})
export class AppModule { }
