import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { BASE_WS_URL } from '../constants';
import { ChatsActions } from '../actions/ChatsActions';

@Injectable()
export class SocketService {
	instance;
	listeners;

	constructor(private chatsActions: ChatsActions) {
		this.listeners = Object.assign({}, this.chatsActions.socketEvents);
	}

	init = () => {
		console.log('[SOCKET] INIT');

		const token = localStorage.getItem('token');

		if (!token) {
			return setTimeout(this.init, 300);
		}

		this.instance = io.connect(
			BASE_WS_URL,
			{
				query: 'token=' + token
			}
		);

		this.instance.once('connect', () => {
			console.log('[SOCKET] CONNECT');
			this.initListeners();
		});
	};

	initListeners() {
		console.log('[SOCKET] INIT LISTENERS');
		Object.keys(this.listeners).forEach(name => this.on(name, this.listeners[name]));
	}

	emit = (event: string, data?, ack?) => {
		console.log(`[SOCKET:EMIT] (${event})`, data);
		this.instance && this.instance.emit(event, data, ack);
	};
	on = (event: string, handler) =>
		this.instance &&
		this.instance.on(event, data => {
			console.log(`[SOCKET:ON] (${event})`, data);
			handler(data);
		});

	off = (event: string, handler?) => this.instance && this.instance.off(event, handler);

	disconnect = () => {
		this.instance.removeAllListeners();
		this.instance.disconnect();
		this.instance = null;
	};
}
