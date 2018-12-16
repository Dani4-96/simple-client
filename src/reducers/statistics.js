import { Record, List } from 'immutable';
import actionTypes from "../constants/actionTypes";

const EntityRecord = Record({
    id: null,
    description: '',
    amount: null,
    date: '',
    userId: null,
});

const ReducerState = Record({
    userId: null,
    loading: false,
    loaded: false,
    error: null,
    bills: List([]),
    shopping: List([]),
    salary: List([]),
});

const defaultState = new ReducerState();

export default (statisticsState = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case actionTypes.LOAD_STATISTICS_START:
            return statisticsState.set('loading', true);

        case actionTypes.LOAD_STATISTICS_SUCCESS:
            return statisticsState
                .set('loading', false)
                .set('loaded', true)
                .set('userId', )
                .set('bills', List(payload.json[0].map(EntityRecord)))
                .set('salary', List(payload.json[1].map(EntityRecord)))
                .set('shopping', List(payload.json[2].map(EntityRecord)));

        case actionTypes.LOAD_STATISTICS_FAIL:
            return statisticsState.set('loading', false).set('error', payload);

        default: return statisticsState;
    }
}