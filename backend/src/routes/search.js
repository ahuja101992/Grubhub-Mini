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

router.get("/searchrest", requireAuth, (req, res) => {
  console.log("searchrest req.body" + JSON.stringify(req.query));

  kafka.make_request(
    "search",
    { path: "searchrest", query: req.query },
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
