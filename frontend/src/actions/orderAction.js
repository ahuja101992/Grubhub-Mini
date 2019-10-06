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
} from "./types";
import axios from "axios";
export function addDish(data) {
  return function(dispatch) {
    // console.log("addDish");
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3010/insertdish", data)
      .then(response => response)
      .then(response => dispatch(addDishes(response)));
  };
}
function addDishes(returndata) {
  // console.log("addDishes" + JSON.stringify(returndata.data));

  return { type: ADD_DISH, payload: returndata };
}

export function getDishes(data) {
  return function(dispatch) {
    // console.log(" data " + data);
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3010/getdishes", data)
      .then(response => response)
      .then(response => dispatch(getDish(response)));
  };
}
function getDish(returndata) {
  // console.log("getDish" + JSON.stringify(returndata.data));

  return { type: GET_DISHES, payload: returndata };
}
export function getCurrentDish(data) {
  return function(dispatch) {
    // console.log(" data " + data);
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3010/getcurrentdish", data)
      .then(response => response)
      .then(response => dispatch(currentDish(response)));
  };
}
function currentDish(returndata) {
  // console.log("getDish" + JSON.stringify(returndata.data));

  return { type: GET_CURRDISHES, payload: returndata };
}

export function nameUpdate(data) {
  return function(dispatch) {
    // console.log(" data " + data);
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3010/getcurrentdish", data)
      .then(response => response)
      .then(response => dispatch(currentDish(response)));
  };
}

export function deleteDish(data) {
  return function(dispatch) {
    // console.log(" data " + data);
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3010/deletedish", data)
      .then(response => response)
      .then(response => dispatch(delDish(response)));
  };
}
function delDish(returndata) {
  // console.log("getDish" + JSON.stringify(returndata.data));

  return { type: DEL_DISHES, payload: returndata };
}

export function updateDishes(data) {
  return function(dispatch) {
    console.log("Del  data " + data);
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3010/updatedish", data)
      .then(response => response)
      .then(response => dispatch(updDish(response)));
  };
}
function updDish(returndata) {
  return { type: UPDATE_DISH, payload: returndata };
} //////
export function rPastOrders(data) {
  return function(dispatch) {
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3010/getrespastorders", data)
      .then(response => response)
      .then(response => dispatch(rPastOrds(response)));
  };
}
function rPastOrds(returndata) {
  return { type: RPAST_ORDER, payload: returndata };
}
export function rCurrOrders(data) {
  return function(dispatch) {
    // console.log("Del  data " + data);
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3010/getrescurrorders", data)
      .then(response => response)
      .then(response => dispatch(rCurrOrds(response)));
  };
}
function rCurrOrds(returndata) {
  return { type: RCURR_ORDER, payload: returndata };
}
export function getItems(data) {
  return function(dispatch) {
    // console.log("Del  data " + data);
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3010/getorditems", data)
      .then(response => response)
      .then(response => dispatch(itemsget(response)));
  };
}
function itemsget(returndata) {
  return { type: GET_ITEMS, payload: returndata };
}
export function cancelOrder(data) {
  return function(dispatch) {
    console.log("Cancel Order data " + data);
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3010/updateorstatus", data)
      .then(response => response)
      .then(response => dispatch(cancelOrd(response)));
  };
}
function cancelOrd(returndata) {
  return { type: CANCEL_ORDER, payload: returndata };
}
export function updateStatus(data) {
  return function(dispatch) {
    console.log("Update " + data);
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3010/updateorstatus", data)
      .then(response => response)
      .then(response => dispatch(updStatus(response)));
  };
}
function updStatus(returndata) {
  return { type: UPDATE_STATUS, payload: returndata };
}
export function getBuyMenu(data) {
  return function(dispatch) {
    console.log("Update " + data);
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3010/getbuydishes", data)
      .then(response => response)
      .then(response => dispatch(getbMenu(response)));
  };
}
function getbMenu(returndata) {
  return { type: GET_DISHESBUY, payload: returndata };
}
export function placeOrder(data) {
  return function(dispatch) {
    console.log("Update " + data);
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3010/insertorder", data)
      .then(response => response)
      .then(response => dispatch(plcOrder(response)));
  };
}
function plcOrder(returndata) {
  return { type: PLACE_ORDER, payload: returndata };
}
export function bCurrOrders(data) {
  return function(dispatch) {
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3010/getcurrorders", data)
      .then(response => response)
      .then(response => dispatch(bCurrOrds(response)));
  };
}
function bCurrOrds(returndata) {
  return { type: BCURR_ORDER, payload: returndata };
}
export function bPastOrders(data) {
  return function(dispatch) {
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3010/getpastorders", data)
      .then(response => response)
      .then(response => dispatch(bPastOrds(response)));
  };
}
function bPastOrds(returndata) {
  return { type: BPAST_ORDER, payload: returndata };
}
