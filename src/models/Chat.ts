import { Message } from './Message';
import { User } from './User'

export interface Chat {
    _id?: string;
    avatar?: string;
    name?: string;
    description?: string;
    type?: 'public' | 'private';
    creator?: User | string;
    messages?: Message[] | string[];
    members?: User[] | string[];
    createdAt?: Date;
    updatedAt?: Date;
    online?: string[] | User[];
}