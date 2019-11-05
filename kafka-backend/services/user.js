// var mongo = require('./mongo');
var bcrypt = require("bcrypt");
const User = require("../models/UserSchemas");
var mongoose = require("mongoose");
const Owner = require("../models/OwnerSchema");
const jwt = require("jsonwebtoken");
const secret = "CMPE_273_grbhub";
const passport = require("passport");
// var Schema = mongoose.Schema;

function handle_request(msg, callback) {
  var res = {};
  console.log("In handle signin request:" + JSON.stringify(msg));
  console.log("Connected to mongodb 123");
  console.log("Message Path:" + typeof msg.path);

  if (msg.path === "registerbuyer") {
    console.log("inside registerbuyer path check");
    User.findOne({ email_id: msg.email_id }).then(user => {
      if (user) {
        let error = "Email Address Exists in Database.";
        callback(null, { status: 400, error });
      } else {
        const newUser = new User({
          first_name: msg.body.f_name,
          last_name: msg.body.l_name,
          email_id: msg.body.email_id,
          password: msg.body.password,
          phone_num: msg.body.phone_num
        });
        bcrypt.genSalt(10, (err, salt) => {
          if (err) console.log("kjkj");
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            response = {
              success: "true",
              errMsg: "Successfully inserted into database.",
              id: newUser._id
            };
            newUser
              .save()
              .then(newUser => {
                callback(null, { status: 200, response });
              })
              .catch(err => {
                callback(null, { status: 400, err });
              });
          });
        });
      }
    });
  } else if (msg.path === "loginbuyer") {
    const email_id = msg.body.username;
    const password = msg.body.password;
    console.log("loginbuyer msg.body" + JSON.stringify(msg.body));
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
        bcrypt.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            const payload = {
              id: user._id,
              // name: user.first_name,
              email_id: user.email_id
            };
            jwt.sign(payload, secret, { expiresIn: 36000 }, (err, token) => {
              if (err) callback(null, { status: 500, err });
              //   res.status(500).json({ error: "Error signing token", raw: err });
              // res.cookie("cookieBuy", {
              //   maxAge: 900000,
              //   httpOnly: false,
              //   path: "/"
              // }); //// has to be implemented on the node application
              response = {
                success: true,
                token: `Bearer ${token}`,
                authFlag: true,
                errMsg: "",
                first_name: user.first_name,
                last_name: user.last_name,
                email_id: user.email_id
              };
              callback(null, { status: 200, response });
            });
          } else {
            let errors = "Username/Password is incorrect";
            response = {
              authFlag: false,
              success: true,
              errMsg: errors
            };
            callback(null, { status: 202, response });
          }
        });
      }
    });
  } else if (msg.path === "registerowner") {
    console.log("registerowner req data: " + JSON.stringify(msg.body));
    Owner.findOne({ email_id: msg.body.email_id }).then(owner => {
      if (owner) {
        console.log("jjjjjjjjj");
        let error = "Email Address Exists in Database.";
        callback(null, { status: 202, error });
      } else {
        const newOwner = new Owner({
          first_name: msg.body.f_name,
          last_name: msg.body.l_name,
          email_id: msg.body.email,
          password: msg.body.email,
          phone_num: msg.body.phone,
          resturant_name: msg.body.rest_name,
          resturant_zipcode: msg.body.rest_zip
        });
        console.log("newOwner testing data " + newOwner);
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(newOwner.password, salt, (err, hash) => {
            if (err) throw err;
            newOwner.password = hash;
            response = {
              success: "true",
              errMsg:
                "Successfully inserted into database. Your password is your email address",
              id: newOwner._id
            };
            newOwner
              .save()
              .then(owner => {
                callback(null, { status: 200, response });
              })
              .catch(err => {
                callback(null, { status: 202, err });
              });
          });
        });
      }
    });
  } else if (msg.path === "loginrest") {
    const email_id = msg.body.username;
    const password = msg.body.password;
    console.log("loginowner msg.body" + JSON.stringify(msg.body));
    Owner.findOne({ email_id: email_id }).then(owner => {
      if (!owner) {
        let errors = "No Account Found";
        response = {
          authFlag: false,
          success: true,
          errMsg: errors
        };
        callback(null, { status: 202, response });
      }
      bcrypt.compare(password, owner.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: owner._id,
            name: owner.first_name,
            email_id: owner.email_id
          };
          jwt.sign(payload, secret, { expiresIn: 36000 }, (err, token) => {
            if (err) callback(null, { status: 500, err });
            //   res.status(500).json({ error: "Error signing token", raw: err });
            // res.cookie("cookieRes", {
            //   maxAge: 900000,
            //   httpOnly: false,
            //   path: "/"
            // });
            response = {
              success: true,
              token: `Bearer ${token}`,
              authFlag: true,
              errMsg: "",
              first_name: owner.first_name,
              last_name: owner.last_name,
              email_id: owner.email_id
            };
            callback(null, { status: 200, response });
          });

          // msg.session.user = msg.body.email;
        } else {
          let errors = "Password is incorrect";
          response = {
            authFlag: false,
            success: true,
            errMsg: errors
          };
          callback(null, { status: 202, response });
        }
      });
    });
  } else {
    callback(null, { status: 500, response: "no path found" });
  }
}
exports.handle_request = handle_request;
