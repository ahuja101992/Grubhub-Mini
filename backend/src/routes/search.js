// src/routes/sections.js
const router = require("express").Router();
const User = require("../models/UserSchemas");
const Owner = require("../models/OwnerSchema");
const bcrypt = require("bcrypt");
const secret = "CMPE_273_grbhub";
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.get("/searchrest", (req, res) => {
  console.log("searchrest req.body" + JSON.stringify(req.query));
  let rest_zip = req.query.zip;
  let dish = req.query.dish;
  Owner.find(
    { "sections.rest_dish.dish_name": dish /*,resturant_zipcode: rest_zip*/ },
    { _id: 1, resturant_name: 1, resturant_zipcode: 1, cuisine: 1, email_id: 1 }
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
  });
});

module.exports = router;
