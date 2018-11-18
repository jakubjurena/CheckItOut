import { SIGNUP_USER, LOGIN_USER } from "../constants/ActionTypes";
import * as R from 'ramda';

const defaultState = {
    login: '',
    signup: '',
};

export default (state = {}, action) => {
    switch (action.type) {
        case SIGNUP_USER:
            if (action.payload.errorMessage) {
                return R.mergeDeepRight(
                    state,
                    {
                        signup: action.payload.errorMessage,
                    }
                )
            } else
                return state;
        case LOGIN_USER:
            if (action.payload.errorMessage) {
                R.mergeDeepRight(
                    state,
                    {
                        login: action.payload.errorMessage,
                    }
                );
            } else
                return state;
        default:
            return defaultState;
    }
};
