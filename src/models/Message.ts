import { User } from './User';

export interface Message {
    _id?: string,
    author?: string | User,
    text?: string,
    attachment?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}