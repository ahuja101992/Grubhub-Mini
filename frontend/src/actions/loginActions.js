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
// import {rooturl} from './../c'
import connectionUrl from "../config/config";
import axios from "axios";

export function fetchLogin(data) {
  return function(dispatch) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token")
    };
    var test = "http://" + connectionUrl + "/users/loginbuyer";
    console.log("testing successful. Redux working" + test);
    axios.defaults.withCredentials = true;
    axios
      .post("http://" + connectionUrl + "/users/loginbuyer", data, {
        headers: headers
      })
      .then(response => response)
      .then(response => dispatch(signinUpd(response)));
  };
}
function signinUpd(returndata) {
  console.log("loginbuy" + JSON.stringify(returndata.data.result.response));
  if (returndata.data.result.response.success == true) {
    let jwtToken = returndata.data.result.response.token.split(" ")[1];
    // let id = getIdArr[1];
    // let name = returndata.data.result.response.first_name + " " + returndata.data.result.response.last_name;
    sessionStorage.setItem(
      "first_name",
      returndata.data.result.response.first_name
    );
    sessionStorage.setItem(
      "last_name",
      returndata.data.result.response.last_name
    );
    sessionStorage.setItem("token", jwtToken);
    sessionStorage.setItem(
      "email_id",
      returndata.data.result.response.email_id
    );
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
      .post("http://" + connectionUrl + "/users/registerbuyer", data)
      .then(response => response)
      .then(response => dispatch(signupUpd(response)));
  };
}
function signupUpd(returndata) {
  // console.log("action.js data " + JSON.stringify(returndata));
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
      .post("http://" + connectionUrl + "/users/loginrest", data)
      .then(response => response)
      .then(response => dispatch(signinresUpd(response)));
  };
}
function signinresUpd(returndata) {
  if (returndata.data.result.response.success === true) {
    let jwtToken = returndata.data.result.response.token.split(" ")[1];
    console.log("loggingsigninresUpd");
    let name =
      returndata.data.result.response.first_name +
      " " +
      returndata.data.result.response.last_name;
    let resName = returndata.data.result.response.resturant_name;
    sessionStorage.setItem("nameRes", name);
    sessionStorage.setItem("Rest-name", resName);
    sessionStorage.setItem("token", jwtToken);
    sessionStorage.setItem(
      "email_idRes",
      returndata.data.result.response.email_id
    );
  }
  return { type: SIGN_IN_R, payload: returndata };
}
export function sign_up_res(data) {
  return function(dispatch) {
    axios.defaults.withCredentials = true;
    axios
      .post("http://" + connectionUrl + "/users/registerowner", data)
      .then(response => response)
      .then(response => dispatch(signupresUpd(response)));
  };
}
function signupresUpd(returndata) {
  console.log("test 2" + JSON.stringify(returndata));
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
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token")
    };
    axios.defaults.withCredentials = true;
    axios
      .post("http://" + connectionUrl + "/profile/getprofile", data, {
        headers: headers
      })
      .then(response => response)
      .then(response => dispatch(profileUpd(response)));
  };
}
function profileUpd(returndata) {
  console.log("profileUpd" + JSON.stringify(returndata.data.result.response));
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
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token")
    };
    console.log("inside update profile");
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post("http://" + connectionUrl + "/profile/updateprofile", data, {
        headers: headers
      })
      .then(response => response)
      .then(response => dispatch(updprofile(response)));
  };
}
function updprofile(returndata) {
  // console.log("abc" + JSON.stringify(returndata.data.result.response));
  if (returndata.data.result.response.success == "true") {
    let name =
      returndata.data.result.response.first_name +
      " " +
      returndata.data.result.response.last_name;
    sessionStorage.removeItem("first_name");
    sessionStorage.removeItem("last_name");
    sessionStorage.setItem(
      "first_name",
      returndata.data.result.response.first_name
    );
    sessionStorage.setItem(
      "last_name",
      returndata.data.result.response.last_name
    );
  }
  return { type: UPD_PROFILE, payload: returndata, toProfileEdit: "false" };
}

export function getResProfile(data) {
  return function(dispatch) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token")
    };
    console.log("data " + JSON.stringify(data));
    axios.defaults.withCredentials = true;
    axios
      .post("http://" + connectionUrl + "/profile/getresprofile", data, {
        headers: headers
      })
      .then(response => response)
      .then(response => dispatch(resprofileUpd(response)));
  };
}
function resprofileUpd(returndata) {
  console.log(
    "resprofileUpd" + JSON.stringify(returndata.data.result.response)
  );
  return { type: GET_RESPROFILE, payload: returndata };
}

export function updateResProfile(data) {
  return function(dispatch) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token")
    };
    console.log("inside update profile");
    axios.defaults.withCredentials = true;
    axios
      .post("http://" + connectionUrl + "/profile/updateresprofile", data, {
        headers: headers
      })
      .then(response => response)
      .then(response => dispatch(updresprof(response)));
  };
}
function updresprof(returndata) {
  console.log(
    "updresprofile" + JSON.stringify(returndata.data.result.response)
  );
  if (returndata.data.result.response.success == true) {
    let resName = returndata.data.result.response.resturant_name;
    let name =
      returndata.data.result.response.first_name +
      " " +
      returndata.data.result.response.last_name;
    sessionStorage.removeItem("nameRes");
    sessionStorage.removeItem("Rest-name");
    sessionStorage.setItem("Rest-name", resName);
    sessionStorage.setItem("nameRes", name);
  }
  return { type: UPD_RESPROFILE, payload: returndata, toProfileEdit: "false" };
}

export function getSearchRes(data) {
  return function(dispatch) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token")
    };
    console.log("getSearchRes " + JSON.stringify(data));
    axios.defaults.withCredentials = true;
    axios
      .get(
        "http://" +
          connectionUrl +
          "/search/searchrest/?dish=" +
          data.dish_name +
          "&zip=" +
          data.rest_zip,
        { headers: headers }
      )
      .then(response => response)
      .then(response => dispatch(search(response)));
  };
}

function search(returndata) {
  return { type: SEARCH_REST, payload: returndata };
}
