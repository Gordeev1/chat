import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController, ViewController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ChatsActions } from '../../actions';
import { chatById as chatSelector, chatMembers } from '../../selectors/chats';
import { Chat } from '../../models/Chat';
import { User } from '../../models/User';
import { AppState } from '../../reducers';

@IonicPage()
@Component({
	selector: 'page-chat-detail',
	templateUrl: 'chat-detail.html',
})
export class ChatDetailPage {

	id: string;
	chat$: Observable<Chat>;
	members$: Observable<User>;

	constructor(
		private navCtrl: NavController,
		private navParams: NavParams,
		private modalCtrl: ModalController,
		private toastCtrl: ToastController,
		private viewCtrl: ViewController,
		private store: Store<AppState>,
		private chatsActions: ChatsActions
	) {
		this.id = this.navParams.get('id');
		this.chat$ = this.store.select(state => chatSelector(state, { id: this.id }));
		this.members$ = this.store.select(state => chatMembers(state, { id: this.id }));
	}

	ngOnInit() {
		this.chatsActions
			.get({ id: this.id })
			.catch(error => this.toastCtrl.create({ message: 'An error has occurred', duration: 3000 }).present())
	}

	dismiss = () => this.viewCtrl.dismiss()

	trackById = (index, item) => item._id;

}

