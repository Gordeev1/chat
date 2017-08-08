import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController, Events } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { messages as messagesSelector } from '../../selectors/messages';
import { chatById as chatSelector } from '../../selectors/chats';
import { UserActions, ChatsActions } from '../../actions';
import { Message } from '../../models/Message';
import { Chat } from '../../models/Chat';
import { AppState } from '../../reducers';
import { SocketService } from '../../services';
import * as eventTypes from '../../actionTypes/events';

@IonicPage()
@Component({
	selector: 'page-chat',
	templateUrl: 'chat.html',
})
export class ChatPage {

	id: string;
	chat$: Observable<Chat>;
	messages$: Observable<Message[]>;
	isSubscribed$: Observable<boolean>;
	userChatsLoading$: Observable<boolean>;
	userId$: Observable<string>;
	chatLoading$: Observable<boolean>;

	@ViewChild('content') content;

	constructor(
		private navParams: NavParams,
		private toastCtrl: ToastController,
		private modalCtrl: ModalController,
		private store: Store<AppState>,
		private chatsActions: ChatsActions,
		private userActions: UserActions,
		private socket: SocketService,
		private events: Events
	) {
		this.id = this.navParams.get('id');
		this.chat$ = this.store.select(state => chatSelector(state, { id: this.id }));
		this.messages$ = this.store.select(state => messagesSelector(state, { id: this.id }));
		this.isSubscribed$ = this.store.select(state => state.user_chats.ids.includes(this.id));
		this.userChatsLoading$ = this.store.select(state => state.user_chats.loading);
		this.userId$ = this.store.select(state => state.user._id);
		this.chatLoading$ = this.store.select(state => state.chats.loading);
		this.events.subscribe(eventTypes.CHATS_NEW_MESSAGE, this.scrollBottom)
	}

	ngOnInit() {
		this.chatsActions.getMessages({ id: this.id });
		this.socket.emit('join', { type: 'chat', id: this.id });
		this.scrollBottom();
	}
	ngOnDestroy() {
		this.socket.emit('leave', { type: 'chat', id: this.id });
		this.events.unsubscribe(eventTypes.CHATS_NEW_MESSAGE, this.scrollBottom);
	}

	showDetail() {
		this.modalCtrl.create('ChatDetailPage', { id: this.id }).present();
	}

	subscribeChat() {
		this.userActions
			.subscribeChat(this.id)
			.catch(error => this.toastCtrl.create({ message: 'An error has occurred', position: 'top', duration: 3000 }).present())
	}

	submitMessage({ text }) {
		if (!text) {
			return this.toastCtrl.create({ message: 'Enter your message', position: 'top', duration: 3000 }).present();
		}
		this.chatsActions
			.postMessage({ id: this.id, payload: { text } })
			.then(this.scrollBottom)
			.catch(error => this.toastCtrl.create({ message: 'An error has occurred', position: 'top', duration: 3000 }).present())
	}

	scrollBottom = () => setTimeout(() => this.content.scrollToBottom(300), 200)

	trackById = (index, item) => item._id;

}
