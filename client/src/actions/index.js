import axios from "axios";
import {FETCH_USER, LOGIN_USER, SIGNUP_USER} from "./types";

export const fetchUser = () => dispatch => {
  axios.get("/auth/current_user").then( (res) => {
    dispatch({ type: FETCH_USER, payload: res.data });
  });
};

export const logoutUser = () => dispatch => {
  axios.get("/auth/logout").then( (res) => {
    dispatch({ type: FETCH_USER, payload: res.data });
  });
};

export const signupUser = (email, password) => dispatch => {
  console.log(email);
  axios.post("/auth/local/signup", {
    email,
    password
  }).then( (res) => {
    dispatch({type: SIGNUP_USER, payload: res.data});
  }
  ).catch( (err) => {
    console.log(err);
  });
};

export const loginUser = (email, password) => dispatch => {
  console.log(email);
  axios.post("/auth/local/login", {
    email,
    password
  }).then( (res) => {
    dispatch({type: LOGIN_USER, payload: res.data});
  }).catch( (err) => {
    console.log(err);
  });
};

