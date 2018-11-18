import { combineReducers } from "redux";
import * as R from 'ramda';
import authReducer from "./authReducer"
import errorsReducer from "./errorsReducer";

const id = 'User';
const reducer = combineReducers({
    user: authReducer,
    errors: errorsReducer
});

export default {
    id,
    reducer,
}

export const getUser = R.path([id, 'user']);
export const getUserErrors = R.path([id, 'error']);
