import {
  FETCH_LOGIN,
  GOTO_SIGNUP,
  SIGN_UP,
  GOTO_LOGIN,
  SIGN_UP_R,
  SIGN_IN_R,
  GOTO_PROFILE,
  GET_PROFILE,
  GOTO_PROFILEEDIT,
  UPD_PROFILE,
  GET_RESPROFILE,
  UPD_RESPROFILE,
  SEARCH_REST,
  GET_DISHESBUY
} from "./types";
import axios from "axios";

export function fetchLogin(data) {
  return function(dispatch) {
    console.log("testing successful. Redux working");
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3010/loginbuyer", data)
      .then(response => response)
      .then(response => dispatch(signinUpd(response)));
  };
}
function signinUpd(returndata) {
  // console.log("abc" + JSON.stringify(returndata.data));
  if (returndata.data.success == "true") {
    let name = returndata.data.first_name + " " + returndata.data.last_name;
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("email_id", returndata.data.email_id);
  }
  return { type: FETCH_LOGIN, payload: returndata };
}
export function toSignUp() {
  return { type: GOTO_SIGNUP, payload: { toSignup: true, toLogin: false } };
}
export function sign_in(data) {
  return function(dispatch) {
    console.log("Inside signIn");
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3010/signupbuy", data)
      .then(response => response)
      .then(response => dispatch(signupUpd(response)));
  };
}
function signupUpd(returndata) {
  console.log("action.js data " + JSON.stringify(returndata));
  return { type: SIGN_UP, payload: returndata };
}
export function toLogin() {
  //   console.log("here");
  return { type: GOTO_LOGIN, payload: { toLogin: true, toSignup: false } };
}

export function sign_in_res(data) {
  return function(dispatch) {
    console.log("Inside signIn for res");
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3010/loginrest", data)
      .then(response => response)
      .then(response => dispatch(signinresUpd(response)));
  };
}
function signinresUpd(returndata) {
  if (returndata.data.success == "true") {
    console.log("loggingsigninresUpd");
    let name = returndata.data.first_name + " " + returndata.data.last_name;
    sessionStorage.setItem("nameRes", name);
    sessionStorage.setItem("email_idRes", returndata.data.email_id);
  }
  return { type: SIGN_IN_R, payload: returndata };
}
export function sign_up_res(data) {
  return function(dispatch) {
    console.log("testing");
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3010/signuprest", data)
      .then(response => response)
      .then(response => dispatch(signupresUpd(response)));
  };
}
function signupresUpd(returndata) {
  console.log("test 2");
  return { type: SIGN_UP_R, payload: returndata };
}
export function toProfile() {
  console.log("here toProfile");
  return {
    type: GOTO_PROFILE,
    payload: { toLogin: false, toSignup: false, toProfile: true }
  };
}

export function getProfile(data) {
  return function(dispatch) {
    console.log("date " + JSON.stringify(data));
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3010/getprofile", data)
      .then(response => response)
      .then(response => dispatch(profileUpd(response)));
  };
}
function profileUpd(returndata) {
  console.log("abc" + JSON.stringify(returndata.data));
  return { type: GET_PROFILE, payload: returndata };
}

export function toProfileedit() {
  // console.log("here toProfile");
  return {
    type: GOTO_PROFILEEDIT,
    payload: {
      toLogin: false,
      toSignup: false,
      toProfile: false,
      toProfileEdit: true
    }
  };
}
export function updateProfile(data) {
  return function(dispatch) {
    console.log("inside update profile");
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post("http://localhost:3010/updateprofile", data)
      .then(response => response)
      .then(response => dispatch(updprofile(response)));
  };
}
function updprofile(returndata) {
  // console.log("abc" + JSON.stringify(returndata.data));
  if (returndata.data.success == "true") {
    let name = returndata.data.first_name + " " + returndata.data.last_name;
    sessionStorage.removeItem("name");
    sessionStorage.setItem("name", name);
  }
  return { type: UPD_PROFILE, payload: returndata, toProfileEdit: "false" };
}

export function getResProfile(data) {
  return function(dispatch) {
    console.log("data " + JSON.stringify(data));
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3010/getresprofile", data)
      .then(response => response)
      .then(response => dispatch(resprofileUpd(response)));
  };
}
function resprofileUpd(returndata) {
  console.log("resprofileUpd" + JSON.stringify(returndata.data));
  return { type: GET_RESPROFILE, payload: returndata };
}

export function updateResProfile(data) {
  return function(dispatch) {
    console.log("inside update profile");
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3010/updateresprofile", data)
      .then(response => response)
      .then(response => dispatch(updresprof(response)));
  };
}
function updresprof(returndata) {
  console.log("updresprofile" + JSON.stringify(returndata.data));
  if (returndata.data.success == "true") {
    let name = returndata.data.first_name + " " + returndata.data.last_name;
    sessionStorage.removeItem("nameRes");
    sessionStorage.setItem("nameRes", name);
  }
  return { type: UPD_RESPROFILE, payload: returndata, toProfileEdit: "false" };
}

export function getSearchRes(data) {
  return function(dispatch) {
    console.log("getSearchRes " + JSON.stringify(data));
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3010/searchrest", data)
      .then(response => response)
      .then(response => dispatch(search(response)));
  };
}

function search(returndata) {
  return { type: SEARCH_REST, payload: returndata };
}
