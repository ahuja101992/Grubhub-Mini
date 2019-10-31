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
  /*let rest_zip = req.query.zip;
  let dish = req.query.dish;
  Owner.find(
    { "sections.rest_dish.dish_name": dish ,resturant_zipcode: rest_zip },
    {
      "sections.rest_dish.dish_name": {
        $regex: ".*" + dish + ".*"
      } 
      // ,resturant_zipcode: rest_zip
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
        getRest: true,
        errMsg: "",
        restaurants: owner
      };
      res.end(JSON.stringify(response));
    }
  });*/
});

module.exports = router;
