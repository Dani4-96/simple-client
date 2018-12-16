import { Record, List } from 'immutable';

import actionTypes from '../constants/actionTypes';

const UsersRecord = Record({
    id: null,
    name: '',
});

const ReducerState = Record({
    loading: false,
    loaded: false,
    error: null,
    entities: List([]),
});

const defaultState = new ReducerState();

export default (usersState = defaultState, action) => {
    const { type, payload } = action;
    
    switch (type) {
        case actionTypes.LOAD_USERS_START:
            return usersState.set('loading', true);

        case actionTypes.LOAD_USERS_SUCCESS:
            return usersState
                .set('loading', false)
                .set('loaded', true)
                .set('entities', List(payload.map(UsersRecord)));

        case actionTypes.LOAD_USERS_FAIL:
            return usersState.set('loading', false).set('error', payload);

        default: return usersState;
    }
}