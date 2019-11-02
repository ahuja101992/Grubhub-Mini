// src/routes/sections.js
const router = require("express").Router();
const User = require("../models/UserSchemas");
const Owner = require("../models/OwnerSchema");
const Chat = require("../models/ChatSchema");
const bcrypt = require("bcrypt");
const secret = "CMPE_273_grbhub";
const passport = require("passport");
const jwt = require("jsonwebtoken");
var kafka = require("../kafka/client");
var requireAuth = passport.authenticate("jwt", { session: false });

router.get("/getownerchats/:email_id", (req, res) => {
  console.log("getownerchats" + req.params.email_id);
  /*kafka.make_request(
    "chats",
    { path: "getownerchats", params: req.params },
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
  );*/
  Chat.find({ owner_email: req.params.email_id }).then(chat => {
    if (!chat) {
      let errors = "No chat Found";
      res.writeHead(202, {
        "Content-Type": "text/plain"
      });
      response = {
        authFlag: false,
        success: true,
        errMsg: errors
      };
      return res.end(JSON.stringify(response));
    } else {
      response = {
        success: true,
        getSuccess: true,
        errMsg: "",
        chat: chat
      };
      res.end(JSON.stringify(response));
    }
  });
});
router.get("/getchatdetails/:nsid", (req, res) => {
  console.log("getchatdetails");
  /*  kafka.make_request(
    "chats",
    { path: "getchatdetails", params: req.params },
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
  );*/
  Chat.findOne({ namespace: req.params.nsid }).then(chat => {
    if (!chat) {
      let errors = "No chat Found";
      res.writeHead(202, {
        "Content-Type": "text/plain"
      });
      response = {
        authFlag: false,
        success: true,
        errMsg: errors
      };
      return res.end(JSON.stringify(response));
    } else {
      response = {
        success: true,
        getSuccess: true,
        errMsg: "",
        chat: chat.messages
      };
      res.end(JSON.stringify(response));
    }
  });
});

module.exports = router;
