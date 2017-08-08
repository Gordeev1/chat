import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { normalize } from 'normalizr';
import { Events } from 'ionic-angular';
import * as types from '../actionTypes';
import * as socketEvents from '../actionTypes/socket';
import { Chat, ChatsArray, MessagesArray, Message, UsersArray } from '../schemas';
import { ApiService } from '../services/api';
import { CHATS_LIMIT_PER_REQUEST, MESSAGES_LIMIT_PER_REQUEST } from '../constants';
import { Chat as ChatModel } from '../models/Chat';
import { Message as MessageModel } from '../models/Message';
import * as models from './ChatsActions.models';
import * as eventTypes from '../actionTypes/events';
import { AppState } from '../reducers';

@Injectable()
export class ChatsActions {

    private state: AppState;

    constructor(
        private store: Store<AppState>,
        private api: ApiService,
        private events: Events
    ) {
        this.store.select(s => s).subscribe(s => this.state = s);
    }

    get = ({ id, refresh, scroll }: models.Get) => {

        const shouldCallAPI = !this.state.chats.ids.length || id || scroll || refresh;
        !this.state.chats.haveMore && scroll && scroll.complete() && scroll.enable(false);

        return this.api
            .call({
                types: {
                    request: types.CHATS_REQUEST,
                    success: types.CHATS_GET_SUCCESS,
                    fail: types.CHATS_FAIL
                },
                shouldCallAPI,
                apiPayload: {
                    method: 'get',
                    endpoint: `chats`,
                    param: id,
                    queries: !id && {
                        skip: refresh ? 0 : this.state.chats.ids.length,
                        limit: CHATS_LIMIT_PER_REQUEST
                    }
                },
                schema: id ? Chat : ChatsArray
            })
            .then(response => {

                if (!id && response) {
                    refresh && refresh.complete();
                    scroll && scroll.complete();

                    if (!response.result.length || response.result.length < CHATS_LIMIT_PER_REQUEST) {
                        this.store.dispatch({ type: types.CHATS_NO_MORE })
                        scroll && scroll.enable(false)
                    }
                }

            })
            .catch(error => {
                scroll && scroll.complete();
                refresh && refresh.complete();
                throw error;
            })
    }

    post = (payload: ChatModel) => this.api.call({
        types: {
            request: types.CHATS_REQUEST,
            success: types.CHATS_CREATE_SUCCESS,
            fail: types.CHATS_FAIL
        },
        shouldCallAPI: true,
        apiPayload: {
            method: 'post',
            endpoint: `chats`,
            body: JSON.stringify(payload)
        },
        schema: Chat
    })

    getMessages = ({ id }: models.Get) => {

        const messages = this.state.entities.chats[id].messages;
        const shouldCallAPI = !messages || !messages.length;

        return this.api.call({
            types: {
                request: types.CHATS_REQUEST,
                success: types.CHATS_MESSAGES_GET_SUCCESS,
                fail: types.CHATS_FAIL
            },
            shouldCallAPI,
            apiPayload: {
                method: 'get',
                endpoint: `chats/${id}/messages`,
                queries: {
                    skip: messages && messages.length,
                    limit: MESSAGES_LIMIT_PER_REQUEST
                }
            },
            toReducer: { id },
            schema: MessagesArray
        })
    }

    postMessage = ({ id, payload }: models.PostMessage) => this.api.call({
        types: {
            request: types.CHATS_REQUEST,
            success: types.CHATS_MESSAGE_POST_SUCCESS,
            fail: types.CHATS_FAIL
        },
        shouldCallAPI: true,
        apiPayload: {
            method: 'post',
            endpoint: `chats/${id}/messages`,
            body: JSON.stringify(payload)
        },
        toReducer: { id },
        schema: Message
    }).then(response => {
        this.store.dispatch({ type: types.CHATS_UPDATE, payload: { updatedAt: new Date() }, params: { id } });
        return response;
    })

    getMembers = ({ id }: models.Get) => this.api.call({
        types: {
            request: types.CHATS_REQUEST,
            success: types.CHATS_MEMBERS_GET_SUCCESS,
            fail: types.CHATS_FAIL
        },
        shouldCallAPI: true,
        apiPayload: {
            method: 'get',
            endpoint: `chats/${id}/members`
        },
        toReducer: { id },
        schema: UsersArray
    })

    onNewMessage = ({ id, item }) => {

        const shouldAdd = !(<MessageModel[]>this.state.entities.chats[id].messages).includes(item._id);

        shouldAdd && this.store.dispatch({
            type: types.CHATS_NEW_MESSAGE,
            payload: normalize(item, Message),
            params: { id }
        })

        shouldAdd && this.events.publish(eventTypes.CHATS_NEW_MESSAGE, { id });
    }

    onNewChatUser = ({ id, userId }) => {
        this.store.dispatch({
            type: types.CHATS_USER_JOIN,
            payload: { result: userId },
            params: { id }
        })
    }

    onUserLeave = ({ id, userId }) => {
        this.store.dispatch({
            type: types.CHATS_USER_LEAVE,
            payload: { result: userId },
            params: { id }
        })
    }

    socketEvents = {
        [socketEvents.CHAT_NEW_MESSAGE]: this.onNewMessage,
        [socketEvents.CHAT_USER_JOIN]: this.onNewChatUser,
        [socketEvents.CHAT_USER_LEAVE]: this.onUserLeave
    }


}