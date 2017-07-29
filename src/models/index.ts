import { Action } from '@ngrx/store';

export type AuthMethods = 'base' | 'facebook';
export type SegmentValues = 'all' | 'user';

export interface ExtendedAction extends Action {
    payload?: any;
    params?: any
}