// src/routes/profile.js
const router = require("express").Router();
const User = require("../models/UserSchemas");
const Owner = require("../models/OwnerSchema");
const bcrypt = require("bcrypt");
const secret = "CMPE_273_grbhub";
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.post("/getprofile", (req, res) => {
  const email_id = req.body.email_id;
  console.log("getprofile req.body" + JSON.stringify(req.body));
  User.findOne({ email_id: email_id }).then(user => {
    if (!user) {
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
      // return res.status(204).json(errors);
    } else {
      response = {
        first_name: user.first_name,
        last_name: user.last_name,
        email_id: user.email_id,
        phone_num: user.phone_num,
        success: true,
        errMsg: ""
      };
      res.end(JSON.stringify(response));
    }
  });
});

router.post("/getresprofile", (req, res) => {
  const email_id = req.body.email_id;
  console.log("getresprofile req.body" + JSON.stringify(req.body));
  Owner.findOne({ email_id: email_id }).then(owner => {
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
      // return res.status(204).json(errors);
    } else {
      response = {
        first_name: owner.first_name,
        last_name: owner.last_name,
        email_id: owner.email_id,
        phone_num: owner.phone_num,
        resturant_name: owner.resturant_name,
        resturant_zipcode: owner.resturant_zipcode,
        cuisine: owner.cuisine,
        success: true,
        errMsg: ""
      };
      res.end(JSON.stringify(response));
    }
  });
});
router.post("/updateprofile", (req, res) => {
  const email_id = req.body.email_id;
  console.log("updateprofile req.body" + JSON.stringify(req.body));
  User.findOne({ email_id: email_id }).then(user => {
    if (!user) {
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
      // return res.status(204).json(errors);
    } else {
      const userUpd = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password,
        phone_num: req.body.phone_num
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
            last_name: userUpd.last_name
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
            .then(user => res.json(response))
            .catch(err => res.status(400).json(err));
        });
      });
    }
  });
});

router.post("/updateresprofile", (req, res) => {
  const email_id = req.body.email_id;
  console.log("updateresprofile req.body" + JSON.stringify(req.body));
  Owner.findOne({ email_id: email_id }).then(owner => {
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
      // return res.status(204).json(errors);
    } else {
      const ownerUpd = new Owner({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password,
        phone_num: req.body.phone_num,
        rest_name: req.body.rest_name,
        cuisine: req.body.cuisine,
        rest_zip: req.body.rest_zip
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
            last_name: ownerUpd.last_name
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
            .then(owner => res.json(response))
            .catch(err => res.status(400).json(err));
        });
      });
    }
  });
});

module.exports = router;
