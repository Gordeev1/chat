import { createSelector } from 'reselect';
import { AppState } from '../reducers';

const getId = (state, { id }) => id;
const getChatsEntities = state => state.entities.chats;

const getMessagesIds = createSelector(
    getId,
    getChatsEntities,
    (id, chats) => chats[id].messages
)

const getMessagesEntities = state => state.entities.messages;
const getUsersEntities = state => state.entities.users;

export const messages = createSelector(
    getMessagesIds,
    getMessagesEntities,
    getUsersEntities,
    (ids, messages, users) => ids && ids
        .map(id => {
            const message = messages[id];
            return message && Object.assign({}, message, { author: users[message.author] });
        })
        .sort((n1, n2) => {
            const d1: any = new Date(n1.createdAt);
            const d2: any = new Date(n2.createdAt);
            return d1 - d2;
        })
)