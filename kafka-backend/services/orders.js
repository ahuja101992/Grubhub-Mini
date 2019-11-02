const User = require("../models/UserSchemas");
const Owner = require("../models/OwnerSchema");
const Order = require("../models/OrderSchema");
const bcrypt = require("bcrypt");
const secret = "CMPE_273_grbhub";
const passport = require("passport");
const jwt = require("jsonwebtoken");
function handle_request(msg, callback) {
  var res = {};
  console.log("In handle orders request:" + JSON.stringify(msg));
  console.log("Connected to mongodb");
  console.log("Message Path:" + msg.path);
  if (msg.path === "insertorder") {
    const rest_email_id = msg.body.rest_email_id;
    const buy_email_id = msg.body.buy_email_id;
    console.log("insertorder msg.body" + JSON.stringify(msg.body));
    const newOrder = new Order({
      rest_email_id: msg.body.rest_email_id,
      buy_email_id: msg.body.buy_email_id,
      restuarant_name: msg.body.restuarant_name,
      address: msg.body.address,
      status: msg.body.status,
      total_price: msg.body.total_price,
      "user.first_name": msg.body.first_name,
      "user.last_name": msg.body.last_name,
      items: msg.body.items
    });
    response = {
      success: true,
      orderSuccess: true,
      errMsg: "Successfully inserted into database.",
      id: newOrder._id
    };
    newOrder
      .save()
      .then(newOrder => {
        callback(null, { status: 200, response });
      })
      .catch(err => {
        callback(null, { status: 202, err });
      });
  } else if (msg.path === "getcurrorders") {
    console.log("getcurrorders msg.params" + JSON.stringify(msg.params));
    // callback(null, { status: 202, response: " " });
    Order.find({ buy_email_id: msg.params.buy_email_id, status: "New" }).then(
      order => {
        if (!order) {
          let errors = "No orders Found";
          response = {
            authFlag: false,
            success: true,
            errMsg: errors
          };
          callback(null, { status: 202, response });
          // return res.end(JSON.stringify(response));
        } else {
          response = {
            success: true,
            getSuccess: true,
            errMsg: "",
            result: order
          };
          callback(null, { status: 200, response });
          // res.end(JSON.stringify(response));
        }
      }
    );
  } else if (msg.path === "getpastorders") {
    console.log("getpastorders msg.params" + JSON.stringify(msg.params));
    Order.find(
      { buy_email_id: msg.params.buy_email_id, status: { $ne: "New" } },
      {}
    ).then(order => {
      if (!order) {
        let errors = "No orders Found";
        response = {
          authFlag: false,
          success: true,
          errMsg: errors
        };
        callback(null, { status: 202, response });
        // return res.end(JSON.stringify(response));
      } else {
        response = {
          success: true,
          getSuccess: true,
          errMsg: "",
          result: order
        };
        callback(null, { status: 200, response });
        // res.end(JSON.stringify(response));
      }
    });
  } else if (msg.path === "getrescurrorders") {
    console.log("getrescurrorders msg.params" + JSON.stringify(msg.params));
    Order.find({
      rest_email_id: msg.params.rest_email_id,
      status: { $ne: "Delivered" }
    }).then(order => {
      if (!order) {
        let errors = "No orders Found";
        response = {
          authFlag: false,
          success: true,
          errMsg: errors
        };
        callback(null, { status: 200, response });
        // return res.end(JSON.stringify(response));
      } else {
        response = {
          success: true,
          getSuccess: true,
          errMsg: "",
          result: order
        };
        callback(null, { status: 200, response });
        // res.end(JSON.stringify(response));
      }
    });
  } else if (msg.path === "getrespastorders") {
    console.log("getrespastorders msg.body" + JSON.stringify(msg.params));
    Order.find(
      { rest_email_id: msg.params.rest_email_id, status: "Delivered" },
      {}
    ).then(order => {
      if (!order) {
        let errors = "No orders Found";
        response = {
          authFlag: false,
          success: true,
          errMsg: errors
        };
        callback(null, { status: 202, response });
        // return res.end(JSON.stringify(response));
      } else {
        response = {
          success: true,
          getSuccess: true,
          errMsg: "",
          result: order
        };
        callback(null, { status: 200, response });
        // res.end(JSON.stringify(response));
      }
    });
  } else if (msg.path === "getorditems") {
    console.log("getorditems msg.body" + JSON.stringify(msg.params));
    Order.findOne({ _id: msg.params.order_id }, {}).then(order => {
      if (!order) {
        let errors = "No orders Found";
        response = {
          authFlag: false,
          success: true,
          errMsg: errors
        };
        callback(null, { status: 202, response });
        // return res.end(JSON.stringify(response));
      } else {
        response = {
          success: true,
          getSuccess: true,
          errMsg: "",
          result: order.items
        };
        callback(null, { status: 200, response });
        // res.end(JSON.stringify(response));
      }
    });
  } else if (msg.path === "updateorstatus") {
    console.log("updateorstatus msg.body" + JSON.stringify(msg.body));
    Order.findOne({ _id: msg.body.order_id }).then(order => {
      if (!order) {
        let errors = "No Order Found";
        response = {
          updateSuccess: false,
          success: true,
          errMsg: errors
        };
        callback(null, { status: 202, response });
        // return res.end(JSON.stringify(response));
      } else {
        response = {
          success: true,
          updateSuccess: true,
          errMsg: ""
        };
        Order.findOneAndUpdate(
          { _id: msg.body.order_id },
          {
            status: msg.body.order_status
          },
          { upsert: true }
        )
          .then(order => {
            callback(null, { status: 200, response });
          })
          .catch(err => {
            callback(null, { status: 202, err });
          });
      }
    });
  }
}
exports.handle_request = handle_request;
