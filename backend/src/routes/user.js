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
/*
///just for reference
routes.post("/reference", function(req, res) {
  kafka.make_request("profile", { path: "register", body: req.body }, function(
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
      res.json({
        result: results
      });

      res.end();
    }
  });
});*/

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
  // User.findOne({ email_id: req.body.email_id }).then(user => {
  //   if (user) {
  //     let error = "Email Address Exists in Database.";
  //     return res.status(400).json(error);
  //   } else {
  //     const newUser = new User({
  //       first_name: req.body.f_name,
  //       last_name: req.body.l_name,
  //       email_id: req.body.email_id,
  //       password: req.body.password,
  //       phone_num: req.body.phone_num
  //     });
  //     bcrypt.genSalt(10, (err, salt) => {
  //       if (err) throw err;
  //       bcrypt.hash(newUser.password, salt, (err, hash) => {
  //         if (err) throw err;
  //         newUser.password = hash;
  //         response = {
  //           success: "true",
  //           errMsg: "Successfully inserted into database.",
  //           id: newUser._id
  //         };
  //         newUser
  //           .save()
  //           .then(newUser => res.json(response))
  //           .catch(err => res.status(400).json(err));
  //       });
  //     });
  //   }
  // });
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
      res.cookie("cookieBuy", {
        maxAge: 900000,
        httpOnly: false,
        path: "/"
      }); //// has to be implemented on the node application
      res.json({
        result: results
      });
      res.end();
    }
  });
  // User.findOne({ email_id: email_id }).then(user => {
  //   if (!user) {
  //     let errors = "No Account Found";
  //     res.writeHead(202, {
  //       "Content-Type": "text/plain"
  //     });
  //     response = {
  //       authFlag: false,
  //       success: true,
  //       errMsg: errors
  //     };
  //     return res.end(JSON.stringify(response));
  //     // return res.status(204).json(errors);
  //   }
  //   bcrypt.compare(password, user.password).then(isMatch => {
  //     if (isMatch) {
  //       const payload = {
  //         id: user._id,
  //         // name: user.first_name,
  //         email_id: user.email_id
  //       };
  //       jwt.sign(payload, secret, { expiresIn: 36000 }, (err, token) => {
  //         if (err)
  //           res.status(500).json({ error: "Error signing token", raw: err });
  //         res.cookie("cookieBuy", {
  //           maxAge: 900000,
  //           httpOnly: false,
  //           path: "/"
  //         });
  //         res.json({
  //           success: true,
  //           token: `Bearer ${token}`,
  //           authFlag: true,
  //           errMsg: "",
  //           first_name: user.first_name,
  //           last_name: user.last_name,
  //           email_id: user.email_id
  //         });
  //       });
  //     } else {
  //       let errors = "Username/Password is incorrect";
  //       res.writeHead(202, {
  //         "Content-Type": "text/plain"
  //       });
  //       response = {
  //         authFlag: false,
  //         success: true,
  //         errMsg: errors
  //       };
  //       res.end(JSON.stringify(response));
  //     }
  //   });
  // });
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
  /*Owner.findOne({ email_id: req.body.email_id }).then(owner => {
    if (owner) {
      let error = "Email Address Exists in Database.";
      return res.status(400).json(error);
    } else {
      const newOwner = new Owner({
        first_name: req.body.f_name,
        last_name: req.body.L_name,
        email_id: req.body.email,
        password: req.body.email,
        phone_num: req.body.phone,
        resturant_name: req.body.rest_name,
        resturant_zipcode: req.body.rest_zip
      });
      console.log("newOwner" + newOwner);
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
            .then(owner => res.json(response))
            .catch(err => res.status(400).json(err));
        });
      });
    }
  });*/
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
      res.cookie("cookieRes", {
        maxAge: 900000,
        httpOnly: false,
        path: "/"
      });
      res.json({
        result: results
      });
      res.end();
    }
  });
  /*Owner.findOne({ email_id: email_id }).then(owner => {
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
    }
    bcrypt.compare(password, owner.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: owner._id,
          name: owner.first_name,
          email_id: owner.email_id
        };
        jwt.sign(payload, secret, { expiresIn: 36000 }, (err, token) => {
          if (err)
            res.status(500).json({ error: "Error signing token", raw: err });
          res.cookie("cookieRes", {
            maxAge: 900000,
            httpOnly: false,
            path: "/"
          });
          res.json({
            success: true,
            token: `Bearer ${token}`,
            authFlag: true,
            errMsg: "",
            first_name: owner.first_name,
            last_name: owner.last_name,
            email_id: owner.email_id
          });
        });

        // req.session.user = req.body.email;
      } else {
        let errors = "Password is incorrect";
        res.writeHead(202, {
          "Content-Type": "text/plain"
        });
        response = {
          authFlag: false,
          success: true,
          errMsg: errors
        };
        res.end(JSON.stringify(response));
      }
    });
  });*/
});

module.exports = router;
