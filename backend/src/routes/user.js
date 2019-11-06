// src/routes/user.js
const router = require("express").Router();
const User = require("../models/UserSchemas");
const Owner = require("../models/OwnerSchema");
const bcrypt = require("bcrypt");
// opts.secretOrKey = "CMPE_273_grbhub";
const secret = "CMPE_273_grbhub";
const passport = require("passport");
var kafka = require("../kafka/client");
const jwt = require("jsonwebtoken");

router.post("/registerbuyer", (req, res) => {
  console.log("registerbuyer req data: " + JSON.stringify(req.body));
  kafka.make_request(
    "user",
    { path: "registerbuyer", body: req.body },
    function(err, results) {
      console.log("in result");
      console.log(results);
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: "System Error, Try Again."
        });
      } else {
        console.log("Inside else");
        res.json({
          result: results
        });

        res.end();
      }
    }
  );
});

router.post("/loginbuyer", (req, res) => {
  const email_id = req.body.username;
  const password = req.body.password;
  console.log("loginbuyer req.body" + JSON.stringify(req.body));
  kafka.make_request("user", { path: "loginbuyer", body: req.body }, function(
    err,
    results
  ) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      console.log("Inside else");
      // res.cookie("cookieBuy", {
      //   maxAge: 900000,
      //   httpOnly: false,
      //   path: "/"
      // }); //// has to be implemented on the node application
      res.json({
        result: results
      });
      res.end();
    }
  });
});

router.post("/registerowner", (req, res) => {
  console.log("registerowner req data: " + JSON.stringify(req.body));
  kafka.make_request(
    "user",
    { path: "registerowner", body: req.body },
    function(err, results) {
      console.log("in result");
      console.log(results);
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: "System Error, Try Again."
        });
      } else {
        console.log("Inside else");
        res.json({
          result: results
        });
        res.end();
      }
    }
  );
});

router.post("/loginrest", (req, res) => {
  const email_id = req.body.username;
  const password = req.body.password;
  console.log("loginowner req.body" + JSON.stringify(req.body));
  kafka.make_request("user", { path: "loginrest", body: req.body }, function(
    err,
    results
  ) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      console.log("Inside else");
      // res.cookie("cookieRes", {
      //   maxAge: 900000,
      //   httpOnly: false,
      //   path: "/"
      // });
      res.json({
        result: results
      });
      res.end();
    }
  });
});

module.exports = router;
