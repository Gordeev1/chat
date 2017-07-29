import { createSelector } from 'reselect';

const getIds = state => state.user_chats.ids;
const getEntities = state => state.entities.chats;

export const userChats = createSelector(
    getIds,
    getEntities,
    (ids, chats) => ids
        .map(id => chats[id])
        .sort((n1, n2) => {
            const d1: any = new Date(n1.updatedAt);
            const d2: any = new Date(n2.updatedAt);
            return d2 - d1;
        })
)