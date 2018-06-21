import { localStorageSync } from 'ngrx-store-localstorage';
import { storeLogger } from 'ngrx-store-logger';

import entities, { EntitiesState } from './entities/';
import user, { UserState } from './user';
import user_chats from './user_chats';
import chats from './chats';
import ui, { UIState } from './ui';
import { CommonState } from './binder';

export interface AppState {
	entities: EntitiesState;
	chats: CommonState;
	user: UserState;
	user_chats: CommonState;
	ui: UIState;
}

export const reducers = {
	entities,
	user,
	user_chats,
	chats,
	ui
};

export const metaReducers = [
	localStorageSync({ keys: ['user', 'user_chats'], rehydrate: true }),
	storeLogger()
];
