import { Message } from '../models/Message';
import { Refresher, InfiniteScroll } from 'ionic-angular';

export interface Get {
    id?: string
    refresh?: Refresher,
    scroll?: InfiniteScroll
}

export interface PostMessage {
    id: string;
    payload: Message
}