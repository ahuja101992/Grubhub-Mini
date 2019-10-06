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
  BPAST_ORDER
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
  bcurrOrds: null
};

export default function orderReducer(state = initialState, action) {
  //switch
  switch (action.type) {
    case ADD_DISH:
      // console.log("action ++++" + JSON.stringify(action.payload.data));
      return Object.assign({}, state, {
        errMsg: action.payload.data.errMsg,
        dishSuccess: action.payload.data.dishSuccess,
        success: action.payload.data.success
      });
    case GET_DISHES:
      // console.log("action ++++" + JSON.stringify(action.payload.data));
      return Object.assign({}, state, {
        errMsg: action.payload.data.errMsg,
        getDishSuccess: action.payload.data.getSuccess,
        success: action.payload.data.success,
        dishes: action.payload.data.dishes
      });
    case GET_CURRDISHES:
      console.log("action ++++" + JSON.stringify(action.payload.data));
      return Object.assign({}, state, {
        errMsg: action.payload.data.errMsg,
        getSuccess: action.payload.data.getSuccess,
        success: action.payload.data.success,
        dishDetails: action.payload.data.dishDetails
      });
    case DEL_DISHES:
      console.log("DEL_DISH ++++" + JSON.stringify(action.payload.data));
      return Object.assign({}, state, {
        errMsg: action.payload.data.errMsg,
        delSuccess: action.payload.data.delSuccess,
        success: action.payload.data.success,
        dishDetails: action.payload.data.dishDetails,
        result: action.payload.data.result
      });
    case UPDATE_DISH:
      console.log("UPD_DISH ++++" + JSON.stringify(action.payload.data));
      return Object.assign({}, state, {
        errMsg: action.payload.data.errMsg,
        delSuccess: action.payload.data.delSuccess,
        success: action.payload.data.success,
        dishDetails: action.payload.data.dishDetails,
        result: action.payload.data.result
      });
    case RCURR_ORDER:
      console.log("RCURR_ORDER ++++" + JSON.stringify(action.payload.data));
      return Object.assign({}, state, {
        errMsg: action.payload.data.errMsg,
        getCurrSuccess: action.payload.data.getSuccess,
        success: action.payload.data.success,
        err: action.payload.data.err,
        currOrds: action.payload.data.result
      });
    case RPAST_ORDER:
      console.log("RPAST_ORDER ++++" + JSON.stringify(action.payload.data));
      return Object.assign({}, state, {
        errMsg: action.payload.data.errMsg,
        getPastSuccess: action.payload.data.getSuccess,
        success: action.payload.data.success,
        err: action.payload.data.err,
        pastOrds: action.payload.data.result
      });
    case GET_ITEMS:
      console.log("GET_ITEMS ++++" + JSON.stringify(action.payload.data));
      return Object.assign({}, state, {
        errMsg: action.payload.data.errMsg,
        getSuccessItems: action.payload.data.getSuccess,
        success: action.payload.data.success,
        err: action.payload.data.err,
        items: action.payload.data.result
      });
    case CANCEL_ORDER:
      console.log("CANCEL_ORD ++++" + JSON.stringify(action.payload.data));
      return Object.assign({}, state, {
        errMsg: action.payload.data.errMsg,
        cancelSuccess: action.payload.data.updateSuccess,
        success: action.payload.data.success,
        err: action.payload.data.err,
        cancelRes: action.payload.data.result
      });
    case UPDATE_STATUS:
      console.log("Update++++" + JSON.stringify(action.payload.data));
      return Object.assign({}, state, {
        errMsg: action.payload.data.errMsg,
        updateSuccess: action.payload.data.updateSuccess,
        success: action.payload.data.success,
        err: action.payload.data.err,
        updateRes: action.payload.data.result
      });
    case GET_DISHESBUY:
      console.log("GET_DISHESBUY++++" + JSON.stringify(action.payload.data));
      return Object.assign({}, state, {
        errMsg: action.payload.data.errMsg,
        getBuyDishSuccess: action.payload.data.getSuccess,
        success: action.payload.data.success,
        err: action.payload.data.err,
        dishesBuy: action.payload.data.result
      });
    case PLACE_ORDER:
      console.log("GET_DISHESBUY++++" + JSON.stringify(action.payload.data));
      return Object.assign({}, state, {
        errMsg: action.payload.data.errMsg,
        orderSuccess: action.payload.data.orderSuccess,
        success: action.payload.data.success,
        err: action.payload.data.err,
        orderResult: action.payload.data.result
      });
    case BCURR_ORDER:
      console.log("BCURR_ORDER ++++" + JSON.stringify(action.payload.data));
      return Object.assign({}, state, {
        errMsg: action.payload.data.errMsg,
        getBCurrSuccess: action.payload.data.getSuccess,
        success: action.payload.data.success,
        err: action.payload.data.err,
        bcurrOrds: action.payload.data.result
      });
    case BPAST_ORDER:
      console.log("BPAST_ORDER ++++" + JSON.stringify(action.payload.data));
      return Object.assign({}, state, {
        errMsg: action.payload.data.errMsg,
        getBPastSuccess: action.payload.data.getSuccess,
        success: action.payload.data.success,
        err: action.payload.data.err,
        bpastOrds: action.payload.data.result
      });
    default:
      return state;
  }
}
