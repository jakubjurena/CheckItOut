import { SIGNUP_USER, LOGIN_USER } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case SIGNUP_USER:
      if (action.payload.errorMessage) {
        const newState = {
          login: state.login,
          signup: action.payload.errorMessage
        };
        return newState;
      } else return state;
      break;
    case LOGIN_USER:
      if (action.payload.errorMessage) {
        const newState = {
          login: action.payload.errorMessage,
          signup: state.signup
        };
        return newState;
      } else return state;
      break;
    default:
      return state;
  }
};
