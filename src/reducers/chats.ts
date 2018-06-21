import binder from './binder';
import * as types from '../actionTypes';

export default binder(
	{
		request: types.CHATS_REQUEST,
		create: types.CHATS_CREATE_SUCCESS,
		success: types.CHATS_GET_SUCCESS,
		fail: types.CHATS_FAIL,
		noMore: types.CHATS_NO_MORE
	},
	(state, action) => {
		switch (action.type) {
			case types.CHATS_MESSAGES_GET_SUCCESS:
			case types.CHATS_MESSAGE_POST_SUCCESS:
			case types.CHATS_MEMBERS_GET_SUCCESS:
				return { ...state, loading: false };
			default:
				return state;
		}
	}
);
