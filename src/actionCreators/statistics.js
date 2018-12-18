import actionTypes from '../constants/actionTypes';
import { apiGet, apiPost, apiDelete } from '../lib/api';

export const loadStatistics = userId => dispatch => {
    dispatch({
        type: actionTypes.LOAD_STATISTICS_START,
    });
    return Promise.all([
        apiGet('bills', {userId: userId}),
        apiGet('salary', {userId: userId}),
        apiGet('shopping', {userId: userId}),
    ]).then(json =>
        dispatch({
            type: actionTypes.LOAD_STATISTICS_SUCCESS,
            payload: { json, userId },
        })
    ).catch(ex =>
        dispatch({
            type: actionTypes.LOAD_STATISTICS_FAIL,
            payload: ex,
        })
    );
};

export const addNote = (entity, body, userId) => dispatch => {
    dispatch({
        type: actionTypes.ADD_NOTE_START,
    });
    return apiPost(entity, body, {userId: userId}).then(json =>
        dispatch({
            type: actionTypes.ADD_NOTE_SUCCESS,
            payload: json,
        })
    ).then(
        () => dispatch(loadStatistics(userId)),
        ex =>
            dispatch({
                type: actionTypes.ADD_NOTE_FAIL,
                payload: ex,
            })
    );
};

export const deleteNote = (entity, id, userId) => dispatch => {
    dispatch({
        type: actionTypes.DELETE_NOTE_START,
    });
    return apiDelete(`${entity}/${id}`).then(json =>
        dispatch({
            type: actionTypes.DELETE_NOTE_SUCCESS,
            payload: json,
        })
    ).then(
        () => dispatch(loadStatistics(userId)),
        ex =>
            dispatch({
                type: actionTypes.DELETE_NOTE_FAIL,
                payload: ex,
            })
    );
};