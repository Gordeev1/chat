import union from 'lodash/union';
import pull from 'lodash/pull';
import * as types from '../../actionTypes';

const concatChildren = (predicate, withUpdate?) => (state, action) => {

    const { id } = action.params;
    const { result } = action.payload;

    const field = [].concat(result);

    return state[id]
        ? Object.assign({}, state, {
            [id]: Object.assign({}, state[id], {
                [predicate]: state[id][predicate] ? union(state[id][predicate], field) : field,
                updatedAt: withUpdate ? new Date() : state[id].updatedAt
            })
        })
        : state;
}

const removeChildren = predicate => (state, action) => {

    const { id } = action.params;
    const { result } = action.payload;

    return state[id]
        ? Object.assign({}, state, {
            [id]: Object.assign({}, state[id], {
                [predicate]: state[id][predicate] ? pull(state[id][predicate], result) : []
            })
        })
        : state;
}

export default (state, action) => {
    switch (action.type) {
        case types.CHATS_MESSAGE_POST_SUCCESS:
            return concatChildren('messages', true)(state, action);
        case types.CHATS_MESSAGES_GET_SUCCESS:
        case types.CHATS_NEW_MESSAGE:
            return concatChildren('messages')(state, action);
        case types.CHATS_MEMBERS_GET_SUCCESS:
            return concatChildren('members')(state, action);
        case types.CHATS_USER_JOIN:
            return concatChildren('online')(state, action);
        case types.CHATS_USER_LEAVE:
            return removeChildren('online')(state, action);
        default:
            return state
    }
}
