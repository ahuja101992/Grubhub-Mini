// src/routes/sections.js
const router = require("express").Router();
const User = require("../models/UserSchemas");
const Owner = require("../models/OwnerSchema");
const bcrypt = require("bcrypt");
const secret = "CMPE_273_grbhub";
const passport = require("passport");
const jwt = require("jsonwebtoken");
var kafka = require("../kafka/client");
var requireAuth = passport.authenticate("jwt", { session: false });

router.post("/addsection", requireAuth, (req, res) => {
  const email_id = req.body.email_id;
  console.log("addsection req.body" + JSON.stringify(req.body));
  kafka.make_request(
    "sections",
    { path: "addsection", body: req.body },
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

router.post("/insertdish", requireAuth, (req, res) => {
  const email_id = req.body.email_id;
  console.log("insertdish req.body" + JSON.stringify(req.body));
  kafka.make_request(
    "sections",
    { path: "insertdish", body: req.body },
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

router.get("/getsection/:email_id", requireAuth, (req, res) => {
  console.log("adddish req.body" + JSON.stringify(req.params));
  kafka.make_request(
    "sections",
    { path: "getsection", params: req.params },
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

router.get("/getbuydishes/:email_id", requireAuth, (req, res) => {
  console.log("adddish req.body" + JSON.stringify(req.params));
  kafka.make_request(
    "sections",
    { path: "getbuydishes", params: req.params },
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

router.post("/delsection", requireAuth, (req, res) => {
  console.log("delsection req.body" + JSON.stringify(req.body));
  kafka.make_request(
    "sections",
    { path: "delsection", body: req.body },
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

router.post("/deletedish", requireAuth, (req, res) => {
  console.log("deletedish req.body" + JSON.stringify(req.body));
  kafka.make_request(
    "sections",
    { path: "deletedish", body: req.body },
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

router.post("/updatedish", requireAuth, (req, res) => {
  console.log("updatedish req.body" + JSON.stringify(req.body));
  kafka.make_request(
    "sections",
    { path: "updatedish", body: req.body },
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
router.get("/getdish/:dish_id", requireAuth, (req, res) => {
  console.log("getdish req.body" + JSON.stringify(req.params));
  kafka.make_request(
    "sections",
    { path: "getdish", params: req.params },
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
