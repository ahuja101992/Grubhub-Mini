import {
  ADD_DISH,
  GET_DISHES,
  GET_CURRDISHES,
  DEL_DISHES,
  UPDATE_DISH,
  RCURR_ORDER,
  RPAST_ORDER,
  GET_ITEMS,
  CANCEL_ORDER,
  UPDATE_STATUS,
  GET_DISHESBUY,
  PLACE_ORDER,
  BCURR_ORDER,
  BPAST_ORDER,
  ADD_SECTION,
  GET_SECTION,
  DEL_SECTION,
  GET_CHATLIST
} from "../actions/types";

const initialState = {
  errMsg: null,
  authFlag: null,
  success: null,
  dishes: null,
  getSuccess: null,
  dishDetails: null,
  delSuccess: null,
  result: null,
  err: null,
  items: null,
  currOrds: null,
  pastOrds: null,
  cancelSuccess: null,
  cancelRes: null,
  updateSuccess: null,
  updateRes: null,
  getBuyDishSuccess: null,
  orderSuccess: null,
  orderResult: null,
  getBCurrSuccess: null,
  bcurrOrds: null,
  insertSecSuccess: null
};

export default function orderReducer(state = initialState, action) {
  //switch
  switch (action.type) {
    case ADD_DISH:
      // console.log("action ++++" + JSON.stringify(action.payload.data));
      return Object.assign({}, state, {
        errMsg: action.payload.data.result.response.errMsg,
        dishSuccess: action.payload.data.result.response.dishSuccess,
        success: action.payload.data.result.response.success
      });
    case GET_DISHES:
      return Object.assign({}, state, {
        errMsg: action.payload.data.result.response.errMsg,
        getDishSuccess: action.payload.data.result.response.getSuccess,
        success: action.payload.data.result.response.success,
        dishes: action.payload.data.result.response.sections
      });
    case GET_CURRDISHES:
      console.log("action ++++" + JSON.stringify(action.payload.data));
      return Object.assign({}, state, {
        errMsg: action.payload.data.result.response.errMsg,
        getSuccess: action.payload.data.result.response.getSuccess,
        success: action.payload.data.result.response.success,
        dishDetails: action.payload.data.result.response.dishDetails
      });
    case DEL_DISHES:
      console.log("DEL_DISH ++++" + JSON.stringify(action.payload.data));
      return Object.assign({}, state, {
        errMsg: action.payload.data.result.response.errMsg,
        delSuccess: action.payload.data.result.response.delSuccess,
        success: action.payload.data.result.response.success,
        dishDetails: action.payload.data.result.response.dishDetails,
        result: action.payload.data.result.response.result
      });
    case UPDATE_DISH:
      console.log("UPD_DISH ++++" + JSON.stringify(action.payload.data));
      return Object.assign({}, state, {
        errMsg: action.payload.data.result.response.errMsg,
        delSuccess: action.payload.data.result.response.delSuccess,
        success: action.payload.data.result.response.success,
        dishDetails: action.payload.data.result.response.dishDetails,
        result: action.payload.data.result.response.result
      });
    case RCURR_ORDER:
      console.log("RCURR_ORDER ++++" + JSON.stringify(action.payload.data));
      return Object.assign({}, state, {
        errMsg: action.payload.data.result.response.errMsg,
        getCurrSuccess: action.payload.data.result.response.getSuccess,
        success: action.payload.data.result.response.success,
        err: action.payload.data.result.response.err,
        currOrds: action.payload.data.result.response.result
      });
    case RPAST_ORDER:
      console.log("RPAST_ORDER ++++" + JSON.stringify(action.payload.data));
      return Object.assign({}, state, {
        errMsg: action.payload.data.result.response.errMsg,
        getPastSuccess: action.payload.data.result.response.getSuccess,
        success: action.payload.data.result.response.success,
        err: action.payload.data.result.response.err,
        pastOrds: action.payload.data.result.response.result
      });
    case GET_ITEMS:
      console.log("GET_ITEMS ++++" + JSON.stringify(action.payload.data));
      return Object.assign({}, state, {
        errMsg: action.payload.data.result.response.errMsg,
        getSuccessItems: action.payload.data.result.response.getSuccess,
        success: action.payload.data.result.response.success,
        err: action.payload.data.result.response.err,
        items: action.payload.data.result.response.result
      });
    case CANCEL_ORDER:
      console.log("CANCEL_ORD ++++" + JSON.stringify(action.payload.data));
      return Object.assign({}, state, {
        errMsg: action.payload.data.result.response.errMsg,
        cancelSuccess: action.payload.data.result.response.updateSuccess,
        success: action.payload.data.result.response.success,
        err: action.payload.data.result.response.err,
        cancelRes: action.payload.data.result.response.result
      });
    case UPDATE_STATUS:
      console.log("Update++++" + JSON.stringify(action.payload.data));
      return Object.assign({}, state, {
        errMsg: action.payload.data.result.response.errMsg,
        updateSuccess: action.payload.data.result.response.updateSuccess,
        success: action.payload.data.result.response.success,
        err: action.payload.data.result.response.err,
        updateRes: action.payload.data.result.response.result
      });
    case GET_DISHESBUY:
      console.log("GET_DISHESBUY++++" + JSON.stringify(action.payload.data));
      return Object.assign({}, state, {
        errMsg: action.payload.data.result.response.errMsg,
        getBuyDishSuccess: action.payload.data.result.response.getSuccess,
        success: action.payload.data.result.response.success,
        err: action.payload.data.result.response.err,
        dishesBuy: action.payload.data.result.response.result
      });
    case PLACE_ORDER:
      console.log("PLACE_ORDER++++" + JSON.stringify(action.payload.data));
      return Object.assign({}, state, {
        errMsg: action.payload.data.result.response.errMsg,
        orderSuccess: action.payload.data.result.response.orderSuccess,
        success: action.payload.data.result.response.success,
        err: action.payload.data.result.response.err,
        orderResult: action.payload.data.result.response.result
      });
    case BCURR_ORDER:
      console.log(
        "It was here too BCURR_ORDER ++++" + JSON.stringify(action.payload.data)
      );
      return Object.assign({}, state, {
        errMsg: action.payload.data.result.response.errMsg,
        getBCurrSuccess: action.payload.data.result.response.getSuccess,
        success: action.payload.data.result.response.success,
        err: action.payload.data.result.response.err,
        bcurrOrds: action.payload.data.result.response.result
      });
    case BPAST_ORDER:
      console.log("BPAST_ORDER ++++" + JSON.stringify(action.payload.data));
      return Object.assign({}, state, {
        errMsg: action.payload.data.result.response.errMsg,
        getBPastSuccess: action.payload.data.result.response.getSuccess,
        success: action.payload.data.result.response.success,
        err: action.payload.data.result.response.err,
        bpastOrds: action.payload.data.result.response.result
      });
    case ADD_SECTION:
      console.log("ADD_SECTION ++++" + JSON.stringify(action.payload.data));
      return Object.assign({}, state, {
        errMsg: action.payload.data.result.response.errMsg,
        addSecSuccess: action.payload.data.result.response.getSuccess,
        success: action.payload.data.result.response.success,
        err: action.payload.data.result.response.err,
        results: action.payload.data.result.response.result
      });
    case GET_SECTION:
      // console.log("GET_SECTION ++++" + JSON.stringify(action.payload.data));
      return Object.assign({}, state, {
        errMsg: action.payload.data.result.response.errMsg,
        getSecSuccess: action.payload.data.result.response.getSuccess,
        success: action.payload.data.result.response.success,
        err: action.payload.data.result.response.err,
        sections: action.payload.data.result.response.sections
      });
    case DEL_SECTION:
      console.log("DEL_SECTION ++++" + JSON.stringify(action.payload.data));
      return Object.assign({}, state, {
        errMsg: action.payload.data.result.response.errMsg,
        delSecSuccess: action.payload.data.result.response.delSecSuccess,
        success: action.payload.data.result.response.success,
        err: action.payload.data.result.response.err,
        result: action.payload.data.result.response.result
      });
    case GET_CHATLIST:
      // console.log("GET_CHATLIST" + JSON.stringify(action.payload.data));
      return Object.assign({}, state, {
        errMsg: action.payload.data.errMsg,
        getchatSuccess: action.payload.data.getSuccess,
        success: action.payload.data.success,
        err: action.payload.data.err,
        chat: action.payload.data.chat
      });
    default:
      return state;
  }
}
