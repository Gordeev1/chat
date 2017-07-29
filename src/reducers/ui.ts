import * as types from '../actionTypes';
import { SegmentValues } from '../models';

export interface UIState {
    activeChatsSegment: SegmentValues;
}

const activeChatsSegment: SegmentValues = 'all';
const defaultState = { activeChatsSegment }

export default (state: UIState = defaultState, action) => {

    if (action.type === types.UI_CHANGE_CHATS_SEGMENT) {
        return { ...state, activeChatsSegment: action.payload }
    }

    return state;
}