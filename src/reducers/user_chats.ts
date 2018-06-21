import uniq from 'lodash/uniq';
import union from 'lodash/union';
import binder from './binder';
import * as types from '../actionTypes';
import { ExtendedAction } from '../models';
import { CommonState } from './binder';

export default binder(
	{
		request: types.USER_CHATS_REQUEST,
		create: types.CHATS_CREATE_SUCCESS,
		success: types.USER_CHATS_GET_SUCCESS,
		noMore: types.USER_CHATS_NO_MORE,
		fail: types.USER_CHATS_FAIL
	},
	(state: CommonState, action: ExtendedAction) => {
		const { type, payload } = action;

		switch (type) {
			case types.USER_AUTH_SUCCESS:
				return {
					...state,
					ids: union(state.ids, payload.primary.chats),
					loading: false,
					haveMore: true
				};
			case types.USER_CHATS_SUBSCRIBE_SUCCESS:
				return {
					...state,
					ids: uniq([...state.ids, action.payload.id]),
					loading: false
				};
			default:
				return state;
		}
	}
);
