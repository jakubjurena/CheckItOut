import { SIGNUP_USER, LOGIN_USER } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case SIGNUP_USER:
      if (action.payload.error) {
        console.log(action.payload.error);
        state.signup = action.payload.signupError;
        return state;
      } else {
        return false;
      }
    case LOGIN_USER:
      if (action.payload.error) {
        console.log(action.payload.error);
        state.login = action.payload.loginError;
        return state;
      } else {
        return false;
      }
    default:
      return state;
  }
};
