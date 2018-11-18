import axios from 'axios';
import { SIGNUP_USER, LOGIN_USER, LOGOUT_USER, FETCH_USER } from '../constants/ActionTypes';

export const signupUser = (email, password) => dispatch => {
    axios
        .post("/auth/local/signup", {
            email,
            password
        })
        .then(res => {
            dispatch({ type: SIGNUP_USER, payload: res.data });
        })
        .catch(err => {
            console.log(err);
        });
};

export const loginUser = (email, password) => dispatch => {
    axios
        .post("/auth/local/login", {
            email,
            password
        })
        .then(res => {
            console.log("AXIOS response: " + JSON.stringify(res));
            dispatch({ type: LOGIN_USER, payload: res.data });
        })
        .catch(err => {
            console.log(err);
        });
};

export const logoutUser = () => dispatch => {
    axios.get("/auth/logout").then(res => {
        dispatch({ type: LOGOUT_USER, payload: res.data });
    });
};

export const fetchUser = () => dispatch => {
    axios.get("/auth/current_user").then(res => {
        dispatch({ type: FETCH_USER, payload: res.data });
    });
};
