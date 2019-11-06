// src/routes/profile.js
const router = require("express").Router();
const User = require("../models/UserSchemas");
const Owner = require("../models/OwnerSchema");
const bcrypt = require("bcrypt");
const secret = "CMPE_273_grbhub";
const passport = require("passport");
const jwt = require("jsonwebtoken");
var requireAuth = passport.authenticate("jwt", { session: false });
var kafka = require("../kafka/client");

router.post("/getprofile", (req, res) => {
  const email_id = req.body.email_id;
  console.log("getprofile req.body" + JSON.stringify(req.body));
  kafka.make_request(
    "profile",
    { path: "getprofile", body: req.body },
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

router.post("/getresprofile", (req, res) => {
  const email_id = req.body.email_id;
  console.log("getresprofile req.body" + JSON.stringify(req.body));
  kafka.make_request(
    "profile",
    { path: "getresprofile", body: req.body },
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
router.post("/updateprofile", requireAuth, (req, res) => {
  const email_id = req.body.email_id;
  console.log("updateprofile req.body" + JSON.stringify(req.body));
  kafka.make_request(
    "profile",
    { path: "updateprofile", body: req.body },
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

router.post("/updateresprofile", requireAuth, (req, res) => {
  const email_id = req.body.email_id;
  console.log("updateresprofile req.body" + JSON.stringify(req.body));
  kafka.make_request(
    "profile",
    { path: "updateresprofile", body: req.body },
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
