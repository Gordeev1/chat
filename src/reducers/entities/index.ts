import { combineReducers } from '@ngrx/store';
import merge from 'lodash/merge';
import { User } from '../../models/User';
import { Chat } from '../../models/Chat';
import { Message } from '../../models/Message';
import users from './users';
import chats from './chats';
import messages from './messages';

export interface EntitiesState {
    users: { [id: string]: User },
    chats: { [id: string]: Chat },
    messages: { [id: string]: Message },
}

const entities = [
    { key: 'users', reducer: users },
    { key: 'chats', reducer: chats },
    { key: 'messages', reducer: messages }
]

const binder = (predicate, specificСases) => (state = {}, action) => {

    if (action.payload && action.payload.entities && action.payload.entities[predicate]) {
        return merge({}, state, action.payload.entities[predicate]);
    }

    return specificСases(state, action);
}

const reducers = entities.map(({ key, reducer }) => ({ [key]: binder(key, reducer) }))

export default combineReducers(Object.assign({}, ...reducers));