import { FETCH_USER, SIGNUP_USER, LOGIN_USER, LOGOUT_USER } from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_USER:
    case LOGOUT_USER:
      return action.payload || false;
    case SIGNUP_USER:
    case LOGIN_USER:
      if (!action.payload.errorMessage) {
        return action.payload;
      }
      return state;
    default:
      return state;
  }
};
