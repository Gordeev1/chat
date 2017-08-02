import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ToastController, LoadingController, Loading, Alert } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import omitBy from 'lodash/omitBy';
import { chats as chatsSelector } from '../../selectors/chats';
import { ChatsActions, UserActions, UiActions } from '../../actions';
import { Chat } from '../../models/Chat';
import { AppState } from '../../reducers';
import { SegmentValues } from '../../models';

@IonicPage()
@Component({
	selector: 'page-chats',
	templateUrl: 'chats.html',
})
export class ChatsPage {

	activeSegment: SegmentValues = 'all';
	chats$: Observable<Chat[]>;
	loader: Loading;
	activeAlert: Alert;

	get doesNotExist() {
		return this.activeSegment === 'all' ? 'No chats found' : 'You don`t have active chats';
	}

	constructor(
		private navCtrl: NavController,
		private store: Store<AppState>,
		private chatsActions: ChatsActions,
		private userActions: UserActions,
		private uiActions: UiActions,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController,
		private loadingCtrl: LoadingController
	) {
		this.chats$ = this.store.select(chatsSelector);
	}

	ngOnInit() {
		this.getChats({});
	}

	onSegmentChange() {
		this.store.dispatch(this.uiActions.changeChatsSegment(this.activeSegment));
		this.getChats({});
	}

	getChats(params) {
		this.activeSegment === 'all'
			? this.chatsActions.get(params)
			: this.userActions.getChats(params);
	}

	openChat = id => this.navCtrl.push('ChatPage', { id })

	refresh = refresh => this.getChats({ refresh })
	loadMore = scroll => this.getChats({ scroll })

	createChat() {

		this.activeAlert = this.alertCtrl.create({
			title: 'Create chat',
			enableBackdropDismiss: true,
			inputs: [
				{ name: 'name', placeholder: 'Enter name' },
				{ name: 'description', placeholder: 'Enter description' }
			],
			buttons: [
				{ text: 'Cancel', role: 'cancel' },
				{
					text: 'OK',
					handler: data => {
						this.submitChat(data);
						return false;
					}
				},
			]
		})

		this.activeAlert.present();
	}

	submitChat = async ({ name, description }: Chat) => {

		if (!name || !name.trim().length) {
			return this.toastCtrl.create({ message: 'Enter name' }).present();
		}

		this.loader = this.loadingCtrl.create({ content: 'Creating...' })
		this.loader.present();

		try {
			const payload = omitBy({ name: name.trim(), description: description && description.trim() }, v => !v);
			const response: any = await this.chatsActions.post(payload);
			this.activeAlert.dismiss();
			this.navCtrl.push('ChatPage', { id: response.result })
		} catch (error) {
			this.toastCtrl.create({ message: 'An error has occurred', duration: 3000 }).present();
		}

		this.loader.dismiss();
	}

}
