import actionTypes from '../constants/actionTypes';
import { apiGet } from '../lib/api';

export const loadUsers = () => dispatch => {
    dispatch({
        type: actionTypes.LOAD_USERS_START
    });
    return apiGet('users').then(json =>
        dispatch({
            type: actionTypes.LOAD_USERS_SUCCESS,
            payload: json,
        })
    ).catch(ex =>
        dispatch({
            type: actionTypes.LOAD_USERS_FAIL,
            payload: ex,
        })
    );
};