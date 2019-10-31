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
  /*const newOrder = new Order({
    rest_email_id: req.body.rest_email_id,
    buy_email_id: req.body.buy_email_id,
    restuarant_name: req.body.restuarant_name,
    address: req.body.address,
    status: req.body.status,
    total_price: req.body.total_price,
    "user.first_name": req.body.first_name,
    "user.last_name": req.body.last_name,
    items: req.body.items
  });
  response = {
    success: true,
    orderSuccess: true,
    errMsg: "Successfully inserted into database.",
    id: newOrder._id
  };
  newOrder
    .save()
    .then(newOrder => res.json(response))
    .catch(err => res.status(400).json(err));*/
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

  /*Order.find({ buy_email_id: req.params.buy_email_id, status: "New" }, {}).then(
    order => {
      if (!order) {
        let errors = "No orders Found";
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
          result: order
        };
        res.end(JSON.stringify(response));
      }
    }
  );*/
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

  /*Order.find(
    { buy_email_id: req.params.buy_email_id, status: { $ne: "New" } },
    {}
  ).then(order => {
    if (!order) {
      let errors = "No orders Found";
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
        result: order
      };
      res.end(JSON.stringify(response));
    }
  });*/
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
  /*Order.find({
    rest_email_id: req.params.rest_email_id,
    status: { $ne: "Delivered" }
  }).then(order => {
    if (!order) {
      let errors = "No orders Found";
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
        result: order
      };
      res.end(JSON.stringify(response));
    }
  });*/
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
  /*Order.find(
    { rest_email_id: req.params.rest_email_id, status: "Delivered" },
    {}
  ).then(order => {
    if (!order) {
      let errors = "No orders Found";
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
        result: order
      };
      res.end(JSON.stringify(response));
    }
  });*/
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
  /*Order.findOne({ _id: req.params.order_id }, {}).then(order => {
    if (!order) {
      let errors = "No orders Found";
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
        result: order.items
      };
      res.end(JSON.stringify(response));
    }
  });*/
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
  /*Order.findOne({ _id: req.body.order_id }).then(order => {
    if (!order) {
      let errors = "No Order Found";
      res.writeHead(202, {
        "Content-Type": "text/plain"
      });
      response = {
        updateSuccess: false,
        success: true,
        errMsg: errors
      };
      return res.end(JSON.stringify(response));
      // return res.status(204).json(errors);
    } else {
      response = {
        success: true,
        updateSuccess: true,
        errMsg: ""
      };
      Order.findOneAndUpdate(
        { _id: req.body.order_id },
        {
          status: req.body.order_status
        },
        { upsert: true }
      )
        .then(order => res.json(response))
        .catch(err => res.status(400).json(err));
    }
  });*/
});

module.exports = router;
