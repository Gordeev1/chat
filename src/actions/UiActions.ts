import { Injectable } from '@angular/core';
import * as types from '../actionTypes';
import { SegmentValues } from '../models';

@Injectable()
export class UiActions {
	changeChatsSegment = (segment: SegmentValues) => ({
		type: types.UI_CHANGE_CHATS_SEGMENT,
		payload: segment
	});
}
