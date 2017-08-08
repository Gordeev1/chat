import { Component, ViewChild, Renderer } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { SocketService } from '../services';
import { AppState } from '../reducers';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {

	@ViewChild(Nav) nav: Nav;
	rootPage = 'SignPage';
	authSubscription: Subscription;
	initialHeight: number;
	appContainer;

	constructor(
		private store: Store<AppState>,
		private platform: Platform,
		private statusBar: StatusBar,
		private splashScreen: SplashScreen,
		private menuCtrl: MenuController,
		private socket: SocketService,
		private renderer: Renderer,
		private keyboard: Keyboard
	) {
		this.platform.ready().then(() => {

			this.authSubscription = this.store
				.select(s => s.user.authorized)
				.subscribe(this.authHandler)

			this.initializeApp();
		})
	}

	initializeApp() {
		this.statusBar.styleDefault();
		this.splashScreen.hide();
		this.initKeyboardSubscription();
	}

	initKeyboardSubscription = () => {
		if (!this.initialHeight && window.innerHeight) {
			this.initialHeight = window.innerHeight;
		}
		this.keyboard
			.onKeyboardShow()
			.subscribe(e => {
				if (!this.appContainer) {
					this.appContainer = document.getElementsByTagName('ion-app')[0];
				}
				this.renderer.setElementStyle(this.appContainer, 'height', this.initialHeight - e.keyboardHeight + 'px');
			})
		this.keyboard
			.onKeyboardHide()
			.subscribe(() =>
				this.renderer.setElementStyle(this.appContainer, 'height', this.initialHeight + 'px')
			)
	}

	authHandler = authorized => {

		if (authorized) {
			this.nav.setRoot('ChatsPage');
			if (!this.socket.instance) this.socket.init();
		} else {
			if (this.socket.instance) this.socket.disconnect();
			this.nav.setRoot('SignPage');
			this.menuCtrl.close();
		}
	}
}
