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
} from "./types";
import axios from "axios";
import connectionUrl from "../config/config";
export function addDish(data) {
  return function(dispatch) {
    // console.log("addDish");
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token")
    };
    axios.defaults.withCredentials = true;
    axios
      .post("http://" + connectionUrl + "/section/insertdish", data, {
        headers: headers
      })
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
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token")
    };
    axios.defaults.withCredentials = true;
    axios
      .get("http://" + connectionUrl + "/section/getsection/" + data.email_id, {
        headers: headers
      })
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
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token")
    };
    axios.defaults.withCredentials = true;
    axios
      .post("http://" + connectionUrl + "/getcurrentdish", data, {
        headers: headers
      })
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
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token")
    };
    axios.defaults.withCredentials = true;
    axios
      .post("http://" + connectionUrl + "/getcurrentdish", data, {
        headers: headers
      })
      .then(response => response)
      .then(response => dispatch(currentDish(response)));
  };
}

export function deleteDish(data) {
  return function(dispatch) {
    // console.log(" data " + data);
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token")
    };
    axios.defaults.withCredentials = true;
    axios
      .post("http://" + connectionUrl + "/section/deletedish", data, {
        headers: headers
      })
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
    // console.log("Del  data " + data);
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token")
    };
    axios.defaults.withCredentials = true;
    axios
      .post("http://" + connectionUrl + "/section/updatedish", data, {
        headers: headers
      })
      .then(response => response)
      .then(response => dispatch(updDish(response)));
  };
}
function updDish(returndata) {
  return { type: UPDATE_DISH, payload: returndata };
} //////
export function rPastOrders(data) {
  return function(dispatch) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token")
    };
    axios.defaults.withCredentials = true;
    axios
      .get(
        "http://" + connectionUrl + "/orders/getrespastorders/" + data.email_id,
        {
          headers: headers
        }
      )
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
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token")
    };
    axios.defaults.withCredentials = true;
    axios
      .get(
        "http://" + connectionUrl + "/orders/getrescurrorders/" + data.email_id,
        {
          headers: headers
        }
      )
      .then(response => response)
      .then(response => dispatch(rCurrOrds(response)));
  };
}
function rCurrOrds(returndata) {
  return { type: RCURR_ORDER, payload: returndata };
}
export function getItems(data) {
  return function(dispatch) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token")
    };
    axios.defaults.withCredentials = true;
    axios
      .get("http://" + connectionUrl + "/orders/getorditems/" + data.ORDER_ID, {
        headers: headers
      })
      .then(response => response)
      .then(response => dispatch(itemsget(response)));
  };
}
function itemsget(returndata) {
  return { type: GET_ITEMS, payload: returndata };
}
export function cancelOrder(data) {
  return function(dispatch) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token")
    };
    axios.defaults.withCredentials = true;
    axios
      .post("http://" + connectionUrl + "/orders/updateorstatus", data, {
        headers: headers
      })
      .then(response => response)
      .then(response => dispatch(cancelOrd(response)));
  };
}
function cancelOrd(returndata) {
  return { type: CANCEL_ORDER, payload: returndata };
}
export function updateStatus(data) {
  return function(dispatch) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token")
    };
    axios.defaults.withCredentials = true;
    axios
      .post("http://" + connectionUrl + "/orders/updateorstatus", data, {
        headers: headers
      })
      .then(response => response)
      .then(response => dispatch(updStatus(response)));
  };
}
function updStatus(returndata) {
  return { type: UPDATE_STATUS, payload: returndata };
}
export function getBuyMenu(data) {
  return function(dispatch) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token")
    };
    axios.defaults.withCredentials = true;
    axios
      .get(
        "http://" + connectionUrl + "/section/getbuydishes/" + data.email_id,
        {
          headers: headers
        }
      )
      .then(response => response)
      .then(response => dispatch(getbMenu(response)));
  };
}
function getbMenu(returndata) {
  return { type: GET_DISHESBUY, payload: returndata };
}
export function placeOrder(data) {
  return function(dispatch) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token")
    };
    axios.defaults.withCredentials = true;
    axios
      .post("http://" + connectionUrl + "/orders/insertorder", data, {
        headers: headers
      })
      .then(response => response)
      .then(response => dispatch(plcOrder(response)));
  };
}
function plcOrder(returndata) {
  return { type: PLACE_ORDER, payload: returndata };
}
export function bCurrOrders(data) {
  return function(dispatch) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token")
    };
    console.log("it was here");
    axios.defaults.withCredentials = true;
    // return new Promise(function(resolve, reject) {
    axios
      .get(
        "http://" + connectionUrl + "/orders/getcurrorders/" + data.email_id,
        {
          headers: headers
        }
      )
      .then(response => response)
      .then(response => {
        dispatch(bCurrOrds(response));
        // resolve();
      });
    // });
  };
}
function bCurrOrds(returndata) {
  return { type: BCURR_ORDER, payload: returndata };
}
export function bPastOrders(data) {
  return function(dispatch) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token")
    };
    axios.defaults.withCredentials = true;
    axios
      .get(
        "http://" + connectionUrl + "/orders/getpastorders/" + data.email_id,
        {
          headers: headers
        }
      )
      .then(response => response)
      .then(response => dispatch(bPastOrds(response)));
  };
}
function bPastOrds(returndata) {
  return { type: BPAST_ORDER, payload: returndata };
}
export function addSections(data) {
  return function(dispatch) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token")
    };
    axios.defaults.withCredentials = true;
    axios
      .post("http://" + connectionUrl + "/section/addsection", data, {
        headers: headers
      })
      .then(response => response)
      .then(response => dispatch(addSec(response)));
  };
}
function addSec(returndata) {
  return { type: ADD_SECTION, payload: returndata };
}
export function getSections(data) {
  // console.log(JSON.stringify(data));
  return function(dispatch) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token")
    };
    axios.defaults.withCredentials = true;
    axios
      .get("http://" + connectionUrl + "/section/getsection/" + data.email_id, {
        headers: headers
      })
      .then(response => response)
      .then(response => dispatch(getSec(response)));
  };
}
function getSec(returndata) {
  return { type: GET_SECTION, payload: returndata };
}
export function delSections(data) {
  return function(dispatch) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token")
    };
    axios.defaults.withCredentials = true;
    axios
      .post("http://" + connectionUrl + "/section/delsection", data, {
        headers: headers
      })
      .then(response => response)
      .then(response => dispatch(delSec(response)));
  };
}
function delSec(returndata) {
  return { type: DEL_SECTION, payload: returndata };
}
export function getOwnerChats(data) {
  return function(dispatch) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token")
    };
    axios.defaults.withCredentials = true;
    axios
      .get("http://" + connectionUrl + "/chats/getownerchats/" + data.email_id)
      .then(response => response)
      .then(response => dispatch(getChats(response)));
  };
}
function getChats(returndata) {
  return { type: GET_CHATLIST, payload: returndata };
}
