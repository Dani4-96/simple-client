import { combineReducers } from 'redux';

import users from './users';
import statistics from './statistics';

export default combineReducers({
    users,
    statistics,
});