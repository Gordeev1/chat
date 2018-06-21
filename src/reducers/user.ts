import union from 'lodash/union';
import uniq from 'lodash/uniq';
import omit from 'lodash/omit';
import * as types from '../actionTypes';
import { User } from '../models/User';

export interface UserState extends User {
	authorized: boolean;
	loading: boolean;
}
const defaultState = {
	authorized: false,
	loading: false,
	_id: null
};

export default (state: UserState = defaultState, action) => {
	const { payload, type } = action;

	switch (type) {
		case types.USER_REQUEST:
			return { ...state, loading: true };
		case types.USER_FAIL:
			return { ...state, loading: false };
		case types.USER_AUTH_SUCCESS:
			return Object.assign({}, state, omit(payload.primary, 'chats'), {
				authorized: true,
				loading: false
			});

		default:
			return state;
	}
};
