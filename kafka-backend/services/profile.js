const User = require("../models/UserSchemas");
const Owner = require("../models/OwnerSchema");
const bcrypt = require("bcrypt");
const secret = "CMPE_273_grbhub";
const passport = require("passport");
const jwt = require("jsonwebtoken");

function handle_request(msg, callback) {
  var res = {};
  console.log("In handle signin request:" + JSON.stringify(msg));
  console.log("Connected to mongodb 123");
  console.log("Message Path:" + msg.path);

  if (msg.path === "getprofile") {
    const email_id = msg.body.email_id;
    console.log("getprofile msg.body" + JSON.stringify(msg.body));
    User.findOne({ email_id: email_id }).then(user => {
      if (!user) {
        let errors = "No Account Found";
        response = {
          authFlag: false,
          success: true,
          errMsg: errors
        };
        callback(null, { status: 202, response });
        // return res.end(JSON.stringify(response));
      } else {
        response = {
          first_name: user.first_name,
          last_name: user.last_name,
          email_id: user.email_id,
          phone_num: user.phone_num,
          profile_image: user.profile_image,
          success: true,
          errMsg: ""
        };
        callback(null, { status: 200, response });
      }
    });
  } else if (msg.path === "getresprofile") {
    const email_id = msg.body.email_id;
    console.log("getresprofile msg.body" + JSON.stringify(msg.body));
    Owner.findOne({ email_id: email_id }).then(owner => {
      if (!owner) {
        let errors = "No Account Found";
        response = {
          authFlag: false,
          success: true,
          errMsg: errors
        };
        callback(null, { status: 202, response });
        // return res.end(JSON.stringify(response));
      } else {
        response = {
          first_name: owner.first_name,
          last_name: owner.last_name,
          email_id: owner.email_id,
          phone_num: owner.phone_num,
          resturant_name: owner.resturant_name,
          resturant_zipcode: owner.resturant_zipcode,
          profile_image: owner.profile_image,
          cuisine: owner.cuisine,
          success: true,
          errMsg: ""
        };
        callback(null, { status: 200, response });
      }
    });
  } else if (msg.path === "updateprofile") {
    const email_id = msg.body.email_id;
    console.log("updateprofile msg.body" + JSON.stringify(msg.body));
    User.findOne({ email_id: email_id }).then(user => {
      if (!user) {
        let errors = "No Account Found";
        response = {
          authFlag: false,
          success: true,
          errMsg: errors
        };
        callback(null, { status: 202, response });
        //   return res.end(JSON.stringify(response));
      } else {
        const userUpd = new User({
          first_name: msg.body.first_name,
          last_name: msg.body.last_name,
          password: msg.body.password,
          phone_num: msg.body.phone_num
        });
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(userUpd.password, salt, (err, hash) => {
            if (err) throw err;
            userUpd.password = hash;
            response = {
              success: true,
              errMsg: "updated successfully ",
              first_name: userUpd.first_name,
              last_name: userUpd.last_name,
              profile_image: userUpd.profile_image
            };
            User.findOneAndUpdate(
              { email_id: email_id },
              {
                first_name: userUpd.first_name,
                last_name: userUpd.last_name,
                password: userUpd.password,
                phone_num: userUpd.phone_num
              },
              { upsert: true }
            )
              .then(user => {
                callback(null, { status: 200, response });
              })
              .catch(err => {
                callback(null, { status: 202, err });
              });
          });
        });
      }
    });
  } else if (msg.path === "updateresprofile") {
    const email_id = msg.body.email_id;
    console.log("updateresprofile msg.body" + JSON.stringify(msg.body));
    Owner.findOne({ email_id: email_id }).then(owner => {
      if (!owner) {
        let errors = "No Account Found";
        response = {
          authFlag: false,
          success: true,
          errMsg: errors
        };
        callback(null, { status: 202, response });
        // return res.end(JSON.stringify(response));
      } else {
        const ownerUpd = new Owner({
          first_name: msg.body.first_name,
          last_name: msg.body.last_name,
          password: msg.body.password,
          phone_num: msg.body.phone_num,
          rest_name: msg.body.rest_name,
          cuisine: msg.body.cuisine,
          rest_zip: msg.body.rest_zip
        });
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(ownerUpd.password, salt, (err, hash) => {
            if (err) throw err;
            ownerUpd.password = hash;
            response = {
              success: true,
              errMsg: "updated successfully ",
              first_name: ownerUpd.first_name,
              last_name: ownerUpd.last_name,
              profile_image: ownerUpd.profile_image
            };
            Owner.findOneAndUpdate(
              { email_id: email_id },
              {
                first_name: ownerUpd.first_name,
                last_name: ownerUpd.last_name,
                password: ownerUpd.password,
                phone_num: ownerUpd.phone_num,
                rest_name: ownerUpd.rest_name,
                rest_zip: ownerUpd.rest_zip,
                cuisine: ownerUpd.cuisine
              },
              { upsert: true }
            )
              .then(owner => {
                callback(null, { status: 200, response });
              })
              .catch(err => {
                callback(null, { status: 200, err });
              });
          });
        });
      }
    });
  }
}
exports.handle_request = handle_request;
