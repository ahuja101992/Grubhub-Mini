// src/routes/orders.js
const router = require("express").Router();
const User = require("../models/UserSchemas");
const Owner = require("../models/OwnerSchema");
const Order = require("../models/OrderSchema");
const bcrypt = require("bcrypt");
const secret = "CMPE_273_grbhub";
const passport = require("passport");
const jwt = require("jsonwebtoken");
var kafka = require("../kafka/client");
var requireAuth = passport.authenticate("jwt", { session: false });

router.post("/insertorder", requireAuth, (req, res) => {
  const rest_email_id = req.body.rest_email_id;
  const buy_email_id = req.body.buy_email_id;
  console.log("insertorder req.body" + JSON.stringify(req.body));
  kafka.make_request(
    "orders",
    { path: "insertorder", body: req.body },
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

router.get("/getcurrorders/:buy_email_id", requireAuth, (req, res) => {
  console.log("getcurrorders req.params" + JSON.stringify(req.params));

  kafka.make_request(
    "orders",
    { path: "getcurrorders", params: req.params },
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

router.get("/getpastorders/:buy_email_id", requireAuth, (req, res) => {
  console.log("getpastorders req.body" + JSON.stringify(req.params));
  kafka.make_request(
    "orders",
    { path: "getpastorders", params: req.params },
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

router.get("/getrescurrorders/:rest_email_id", requireAuth, (req, res) => {
  console.log("getrescurrorders req.body" + JSON.stringify(req.params));
  kafka.make_request(
    "orders",
    { path: "getrescurrorders", params: req.params },
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

router.get("/getrespastorders/:rest_email_id", requireAuth, (req, res) => {
  console.log("getrespastorders req.body" + JSON.stringify(req.params));
  kafka.make_request(
    "orders",
    { path: "getrespastorders", params: req.params },
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

router.get("/getorditems/:order_id", requireAuth, (req, res) => {
  console.log("getorditems req.body" + JSON.stringify(req.params));
  kafka.make_request(
    "orders",
    { path: "getorditems", params: req.params },
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

router.post("/updateorstatus", requireAuth, (req, res) => {
  console.log("updateorstatus req.body" + JSON.stringify(req.body));
  kafka.make_request(
    "orders",
    { path: "updateorstatus", body: req.body },
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

module.exports = router;
