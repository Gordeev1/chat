import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { normalize } from 'normalizr';
import { getHeaders, checkStatus, getUrl } from '../utils/http';
import { AppState } from '../reducers';

@Injectable()
export class ApiService {

    constructor(private store: Store<AppState>) { }

    call = action => {
        const {
            types,
            apiPayload,
            shouldCallAPI,
            schema,
            toReducer,
        } = action;

        if (!shouldCallAPI) {
            return Promise.resolve();
        }

        const { request, success, fail } = types;
        const { method, body } = apiPayload;

        this.store.dispatch({ type: request });

        const url = getUrl(apiPayload);

        return fetch(url, { method, body, headers: getHeaders() })
            .then(response => response.json())
            .then(checkStatus)
            .then(json => schema ? normalize(json, schema) : json)
            .then(response => {
                const action: any = { type: success, payload: response, params: toReducer };
                this.store.dispatch(action);
                return response;
            })
            .catch(error => {
                this.store.dispatch({ type: fail, payload: error })
                throw error;
            })
    }
}