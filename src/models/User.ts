import { Chat } from './Chat';

export interface User {
	_id?: string;
	name?: string;
	email?: string;
	avatar?: string;
	facebook?: string;
	birthday?: Date;
	gender?: 'male' | 'female';
	chats?: string[] | Chat[];
	createdAt?: Date;
	updatedAt?: Date;
}
