import { Injectable } from '@angular/core';
import { Facebook } from '@ionic-native/facebook';
import { Store } from '@ngrx/store';
import { UserActions } from '../actions';

@Injectable()
export class FacebookService {

    authorized: boolean;
    authSubscription: any;

    constructor(
        private store: Store<any>,
        private userActions: UserActions,
        private facebook: Facebook
    ) {
        this.authSubscription = this.store
            .select(state => {
                const { authorized, facebook } = state.user;
                return Boolean(authorized && facebook);
            })
            .subscribe(authorized => this.authorized = authorized)
    }

    authorize = async () => {

        try {

            const auth = await this.facebook.login(['email', 'public_profile']);

            const { userID, accessToken } = auth.authResponse;

            const user = await this.facebook.api('me?fields=birthday,email,gender,id,name,picture', ['email', 'public_profile'])

            const { name, email, birthday, gender, picture: { data: { url } } } = user;

            const payload = {
                id: userID,
                name,
                email,
                avatar: url,
                gender,
                birthday,
                accessToken
            }

            return this.userActions.authorize({ payload, method: 'facebook' });
        } catch (error) {
            console.log('[FB] AUTHORIZE ERROR', error);
            return Promise.reject(error);
        }
    }
}