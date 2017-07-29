import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, LoadingController, Loading } from 'ionic-angular';
import { FacebookService } from '../../services';
import { UserActions } from '../../actions';
import { AuthMethods } from '../../models';

@IonicPage()
@Component({
	selector: 'page-sign',
	templateUrl: 'sign.html',
})
export class SignPage {

	name: string;
	loader: Loading;
	isMobile: boolean;

	constructor(
		private navCtrl: NavController,
		private platform: Platform,
		private navParams: NavParams,
		private facebook: FacebookService,
		private toastСtrl: ToastController,
		private loadingCtrl: LoadingController,
		private userActions: UserActions
	) {
		this.isMobile = this.platform.is('mobile');
	}

	authorize = async (method: AuthMethods) => {

		if (method === 'base') {
			this.name = this.name && this.name.trim();
			if (!this.name) {
				return this.toastСtrl.create({ message: 'Enter name', duration: 3000 }).present();
			}
		}

		this.loader = this.loadingCtrl.create({ content: 'Loading...' });
		this.loader.present();

		try {
			await (
				method === 'base'
					? this.userActions.authorize({ payload: { name: this.name }, method })
					: this.facebook.authorize()
			)
		} catch (error) {
			this.toastСtrl.create({ message: 'An error has occurred', duration: 3000 }).present();
		}

		this.loader.dismiss();
	}

}
