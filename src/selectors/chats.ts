import { createSelector } from 'reselect';
import { AppState } from '../reducers';

const getIds = createSelector(
	(state: AppState) => state.chats.ids,
	(state: AppState) => state.user_chats.ids,
	(state: AppState) => state.ui.activeChatsSegment,
	(chats, userChats, activeSegment) => (activeSegment === 'all' ? chats : userChats)
);
const getEntities = (state: AppState) => state.entities.chats;
const getUsersEntities = (state: AppState) => state.entities.users;

export const chats = createSelector(getIds, getEntities, (ids: string[], chats) =>
	ids.map(id => chats[id]).sort((n1, n2) => {
		const d1: any = new Date(n1.updatedAt);
		const d2: any = new Date(n2.updatedAt);
		return d2 - d1;
	})
);

const getId = (state, { id }) => id;

export const chatById = createSelector(getId, getEntities, (id, chats) => chats[id]);

export const chatMembers = createSelector(
	chatById,
	getUsersEntities,
	(chat: any, users) =>
		chat.members &&
		chat.members.map(id => ({
			...users[id],
			online: chat.online && chat.online.includes(id)
		}))
);
