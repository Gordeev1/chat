import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as types from '../actionTypes';
import { User } from '../schemas';
import { ApiService } from '../services/api';
import { CHATS_LIMIT_PER_REQUEST } from '../constants';
import { ChatsArray } from '../schemas';
import * as models from './UserActions.models';
import { AppState } from '../reducers';

@Injectable()
export class UserActions {
	private state: AppState;

	constructor(private store: Store<AppState>, private api: ApiService) {
		this.store.select(s => s).subscribe(s => (this.state = s));
	}

	authorize = ({ payload, method }: models.Authorize) =>
		this.api
			.call({
				types: {
					request: types.USER_REQUEST,
					success: types.USER_AUTH_SUCCESS,
					fail: types.USER_FAIL
				},
				shouldCallAPI: true,
				apiPayload: {
					method: 'post',
					endpoint: `auth/${method}`,
					body: JSON.stringify(payload)
				}
			})
			.then((response: any) => {
				const { token } = response;
				localStorage.setItem('token', token);
				return response;
			});

	subscribeChat = (id: string) =>
		this.api.call({
			types: {
				request: types.USER_CHATS_REQUEST,
				success: types.USER_CHATS_SUBSCRIBE_SUCCESS,
				fail: types.USER_CHATS_FAIL
			},
			shouldCallAPI: true,
			apiPayload: {
				method: 'post',
				endpoint: `me/chats/${id}`
			}
		});

	getChats = ({ refresh, scroll }) => {
		!this.state.user_chats.haveMore && scroll && scroll.complete() && scroll.enable(false);

		return this.api
			.call({
				types: {
					request: types.USER_CHATS_REQUEST,
					success: types.USER_CHATS_GET_SUCCESS,
					fail: types.USER_CHATS_FAIL
				},
				shouldCallAPI: true,
				apiPayload: {
					method: 'get',
					endpoint: `me/chats`,
					queries: {
						skip: refresh ? 0 : this.state.user_chats.ids.length,
						limit: CHATS_LIMIT_PER_REQUEST
					}
				},
				schema: ChatsArray
			})
			.then(response => {
				refresh && refresh.complete();
				scroll && scroll.complete();

				if (!response.result.length || response.result.length < CHATS_LIMIT_PER_REQUEST) {
					this.store.dispatch({ type: types.USER_CHATS_NO_MORE });
					scroll && scroll.enable(false);
				}
			})
			.catch(error => {
				scroll && scroll.complete();
				refresh && refresh.complete();
				throw error;
			});
	};
}
