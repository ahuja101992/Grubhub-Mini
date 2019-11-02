import {
  FETCH_LOGIN,
  GOTO_SIGNUP,
  SIGN_UP,
  GOTO_LOGIN,
  SIGN_IN_R,
  SIGN_UP_R,
  GOTO_PROFILE,
  GET_PROFILE,
  GOTO_PROFILEEDIT,
  UPD_PROFILE,
  GET_RESPROFILE,
  UPD_RESPROFILE,
  SEARCH_REST
} from "../actions/types";

const initialState = {
  errMsg: null,
  authFlag: null,
  toSignup: false,
  success: null,
  toLogin: false,
  toProfile: false,
  first_name: null,
  last_name: null,
  phone_num: null,
  email_id: null,
  toProfileEdit: null,
  rest_name: null,
  rest_zip: null,
  resturants: []
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LOGIN:
      console.log("action ++++" + JSON.stringify(action.payload.data));
      return Object.assign({}, state, {
        errMsg: action.payload.data.result.response.errMsg,
        authFlag: action.payload.data.result.response.authFlag
      });
    case GOTO_SIGNUP:
      console.log("GOTO_SIGNUP");
      return Object.assign({}, state, {
        toSignup: action.payload.toSignup,
        toLogin: action.payload.toLogin
      });
    case SIGN_UP:
      console.log("action data" + JSON.stringify(action));
      return Object.assign({}, state, {
        errMsg: action.payload.data.result.response.errMsg,
        success: action.payload.data.result.response.success
      });
    case GOTO_LOGIN:
      return Object.assign({}, state, {
        toLogin: action.payload.toLogin,
        toSignup: action.payload.toSignup
      });
    case SIGN_IN_R:
      console.log("step2" + JSON.stringify(action));
      return Object.assign({}, state, {
        errMsg: action.payload.data.result.response.errMsg,
        success: action.payload.data.result.response.success,
        authFlag: action.payload.data.result.response.authFlag
      });
    case SIGN_UP_R:
      console.log("step2" + action.payload);
      return Object.assign({}, state, {
        errMsg: action.payload.data.result.response.errMsg,
        success: action.payload.data.result.response.success
      });
    case GOTO_PROFILE:
      return Object.assign({}, state, {
        toLogin: action.payload.toLogin,
        toSignup: action.payload.toSignup,
        toProfile: action.payload.toProfile
      });
    case GET_PROFILE:
      console.log("Get Profile" + JSON.stringify(action.payload.data));
      return Object.assign({}, state, {
        errMsg: action.payload.data.errMsg,

        success: action.payload.data.result.response.success,
        first_name: action.payload.data.result.response.first_name,
        last_name: action.payload.data.result.response.last_name,
        email_id: action.payload.data.result.response.email_id,
        phone_num: action.payload.data.result.response.phone_num,
        profile_image: action.payload.data.result.response.profile_image
      });
    case GOTO_PROFILEEDIT:
      return Object.assign({}, state, {
        toLogin: action.payload.toLogin,
        toSignup: action.payload.toSignup,
        toProfileEdit: action.payload.toProfileEdit
      });
    case UPD_PROFILE:
      console.log("update profile");
      return Object.assign({}, state, {
        success: action.payload.data.result.response.success,
        errMsg: action.payload.data.result.response.errMsg,
        first_name: action.payload.data.result.response.first_name,
        last_name: action.payload.data.result.response.last_name,
        profile_image: action.payload.data.result.response.profile_image,
        toProfileEdit: action.toProfileEdit
      });
    case GET_RESPROFILE:
      console.log("Get RES Profile" + JSON.stringify(action.payload.data));
      return Object.assign({}, state, {
        errMsg: action.payload.data.result.response.errMsg,
        success: action.payload.data.result.response.success,
        first_name: action.payload.data.result.response.first_name,
        last_name: action.payload.data.result.response.last_name,
        email_id: action.payload.data.result.response.email_id,
        phone_num: action.payload.data.result.response.phone_num,
        rest_name: action.payload.data.result.response.resturant_name,
        rest_zip: action.payload.data.result.response.resturant_zipcode,
        cuisine: action.payload.data.result.response.cuisine,
        profile_image: action.payload.data.result.response.profile_image
      });
    case UPD_RESPROFILE:
      console.log("update res profile" + JSON.stringify(action));
      return Object.assign({}, state, {
        success: action.payload.data.result.response.success,
        errMsg: action.payload.data.result.response.errMsg,
        first_name: action.payload.data.result.response.first_name,
        last_name: action.payload.data.result.response.last_name,
        phone_num: action.payload.data.result.response.phone_num,
        rest_name: action.payload.data.result.response.resturant_name,
        rest_zip: action.payload.data.result.response.resturant_zipcode,
        // toProfileEdit: action.result.response.toProfileEdit,
        profile_image: action.payload.data.result.response.profile_image
      });
    case SEARCH_REST:
      // console.log("Inside Search" + JSON.stringify(action));
      return Object.assign({}, state, {
        success: action.payload.data.result.response.success,
        errMsg: action.payload.data.result.response.errMsg,
        getRest: action.payload.data.result.response.getRest,
        restaurants: action.payload.data.result.response.restaurants
      });
    default:
      return state;
  }
}
