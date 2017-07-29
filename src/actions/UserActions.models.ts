import { AuthMethods } from '../models';
import { User } from '../models/User';

export interface Authorize {
    payload: User,
    method: AuthMethods
}