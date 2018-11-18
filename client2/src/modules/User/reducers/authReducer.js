import { SIGNUP_USER, LOGIN_USER, LOGOUT_USER, FETCH_USER } from '../constants/ActionTypes';

export default (state = null, action) => {
    switch (action.type) {
        case SIGNUP_USER:
        case LOGIN_USER:
            if (!action.payload.errorMessage) {
                return action.payload;
            }
            return state;
        case FETCH_USER:
        case LOGOUT_USER:
            return action.payload || false;
        default:
            return state;
    }
}
