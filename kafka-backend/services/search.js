// var mongo = require('./mongo');
var bcrypt = require("bcrypt");
const User = require("../models/UserSchemas");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

function handle_request(msg, callback) {
  var res = {};
  console.log("In handle search request:" + JSON.stringify(msg));
  //   mongoose.connect(function(err, db) {
  //     if (err) {
  //       callback(null, "Cannot connect to db");
  //     } else {
  console.log("Connected to mongodb");
  console.log("Message Path:" + msg.path);
  if (msg.path === "searchrest") {
    console.log("searchrest msg.body" + JSON.stringify(msg.query));
    let rest_zip = msg.query.zip;
    let dish = msg.query.dish;
    Owner.find(
      // { "sections.rest_dish.dish_name": dish /*,resturant_zipcode: rest_zip*/ },
      {
        "sections.rest_dish.dish_name": {
          $regex: ".*" + dish + ".*"
        } /*,resturant_zipcode: rest_zip*/
      },
      {
        _id: 1,
        resturant_name: 1,
        resturant_zipcode: 1,
        cuisine: 1,
        email_id: 1,
        profile_image: 1
      }
    ).then(owner => {
      if (!owner) {
        let errors = "No Account Found";
        response = {
          authFlag: false,
          success: true,
          errMsg: errors
        };
        callback(null, { status: 202, response });
      } else {
        response = {
          success: true,
          getRest: true,
          errMsg: "",
          restaurants: owner
        };
        callback(null, { status: 200, response });
      }
    });
  }
}

exports.handle_request = handle_request;
