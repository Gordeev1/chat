import { PipeTransform, Pipe } from '@angular/core';
import { DEFAULT_CHAT_AVATAR, DEFAULT_USER_AVATAR } from '../constants';

@Pipe({ name: 'imageUrl' })
export class ImageUrl implements PipeTransform {
	readonly url: string = '/static';

	default = {
		chat: DEFAULT_CHAT_AVATAR,
		user: DEFAULT_USER_AVATAR
	};

	transform(value: string, type: string, preview?: boolean) {
		if (value) {
			return preview ? this.url + 'preview_' + value : this.url + value;
		}

		return this.default[type];
	}
}

export const pipes = [ImageUrl];
