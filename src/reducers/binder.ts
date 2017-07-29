import pull from 'lodash/pull';
import union from 'lodash/union';
import { ActionReducer } from '@ngrx/store';

export interface CommonState {
    query: any,
    ids: string[],
    loading: boolean,
    haveMore: boolean
}

const defaultState = {
    query: {},
    ids: [],
    loading: false,
    haveMore: true
}
export default (types, specificСases?: ActionReducer<CommonState>) => (state: CommonState = defaultState, action) => {

    const { request, create, success, fail, remove, query, successQuery, noMore } = types;
    const { type, payload } = action;

    switch (type) {
        case request:
            return Object.assign({}, state, { loading: true })
        case create:
        case success:
            return Object.assign({}, state, {
                ids: union(state.ids, [].concat(payload.result)),
                loading: false,
                haveMore: true
            })
        case successQuery:
            return Object.assign({}, state, {
                ids: payload.result,
                loading: false
            });
        case noMore:
            return Object.assign({}, state, { haveMore: false });
        case fail:
            return Object.assign({}, state, { loading: false });
        case remove:
            return Object.assign({}, state, {
                ids: pull([...state.ids], payload.id),
                loading: false
            })
        case query:
            return Object.assign({}, state, { query: payload })
        default:
            return specificСases(state, action);
    }
}