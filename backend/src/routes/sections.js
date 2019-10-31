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

  /*Owner.findOne({ email_id: email_id }).then(owner => {
    if (!owner) {
      let errors = "No Account Found";
      res.writeHead(202, {
        "Content-Type": "text/plain"
      });
      response = {
        authFlag: false,
        success: false,
        getSuccess: false,
        errMsg: errors
      };
      return res.end(JSON.stringify(response));
      // return res.status(204).json(errors);
    } else {
      Owner.findOne({ "sections.section_name": req.body.section_name }).then(
        section => {
          if (section) {
            let error = "Section Already exists for the restaurant.";
            res.writeHead(202, {
              "Content-Type": "text/plain"
            });
            response = {
              authFlag: false,
              success: true,
              getSuccess: false,
              errMsg: error
            };
            return res.end(JSON.stringify(response));
            s;
          } else {
            const sec = new Owner({
              section_name: req.body.section_name
            });
            response = {
              success: true,
              errMsg: "Section inserted into the database",
              getSuccess: true,
              id: sec._id
            };
            Owner.findOneAndUpdate(
              { email_id: email_id },
              {
                $push: {
                  sections: { section_name: req.body.section_name }
                }
              },
              { upsert: true }
            )
              .then(sec => res.json(response))
              .catch(err => res.status(400).json("Error inserting section"));
          }
        }
      );
    }
  });*/
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
      // return res.status(204).json(errors);
    } else {
      Owner.findOne({
        email_id: email_id,
        "sections.rest_dish.dish_name": req.body.dish_name
      }).then(dishes => {
        if (dishes) {
          let error = "Dish already exists for the restaurant.";
          res.writeHead(202, {
            "Content-Type": "text/plain"
          });
          response = {
            authFlag: false,
            success: true,
            dishSuccess: false,
            errMsg: error
          };
          return res.end(JSON.stringify(response));
        } else {
          const dish = new Owner({
            dish_name: req.body.dish_name,
            dish_desc: req.body.dish_desc,
            dish_price: req.body.dish_price,
            dish_image: req.body.dish_image
          });
          response = {
            success: true,
            errMsg: "Dish inserted into the database",
            dishSuccess: true,
            id: dish._id
          };
          Owner.findOneAndUpdate(
            {
              email_id: email_id,
              "sections.section_name": req.body.type
            },
            {
              $push: {
                "sections.$.rest_dish": {
                  dish_name: req.body.dish_name,
                  dish_desc: req.body.dish_desc,
                  dish_price: req.body.dish_price,
                  dish_image: req.body.dish_image
                }
              }
            }
          )
            .then(dish => res.json(response))
            .catch(err => res.status(400).json("Error inserting dish"));
        }
      });
    }
  });*/
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
  /*Owner.findOne({ email_id: req.params.email_id }).then(owner => {
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
        getSuccess: true,
        errMsg: "",
        sections: owner.sections
      };
      res.end(JSON.stringify(response));
    }
  });*/
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
  /*Owner.findOne({ email_id: req.params.email_id }, {}).then(owner => {
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
        getSuccess: true,
        errMsg: "",
        result: owner.sections
      };
      res.end(JSON.stringify(response));
    }
  });*/
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
  /*Owner.findOne({ email_id: req.body.email_id }).then(owner => {
    if (!owner) {
      let errors = "No Account Found";
      res.writeHead(202, {
        "Content-Type": "text/plain"
      });
      response = {
        delSecSuccess: false,
        success: true,
        errMsg: errors
      };
      return res.end(JSON.stringify(response));
    } else {
      response = {
        success: true,
        delSecSuccess: true
      };

      Owner.update(
        {
          email_id: req.body.email_id,
          "sections.section_name": req.body.type
        },
        {
          $pull: {
            sections: { section_name: req.body.type }
          }
        }
      )
        .then(dish =>
          res.json({
            success: true,
            delSecSuccess: true,
            result: dish
          })
        )
        .catch(err => res.status(400).json("Error deleting section"));
    }
  });*/
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
  /*Owner.findOne({ email_id: req.body.email_id }).then(owner => {
    if (!owner) {
      let errors = "No Account Found";
      res.writeHead(202, {
        "Content-Type": "text/plain"
      });
      response = {
        delSuccess: false,
        success: true,
        errMsg: errors
      };
      return res.end(JSON.stringify(response));
    } else {
      response = {
        success: true,
        delSuccess: true,
        errMsg: "Dish deleted"
      };

      Owner.update(
        {
          email_id: req.body.email_id,
          "sections.rest_dish._id": req.body.dish_id
        },
        {
          $pull: {
            "sections.$[].rest_dish": { _id: req.body.dish_id }
          }
        }
      )
        .then(dish => res.json(dish))
        .catch(err => res.status(400).json("Error deleting dish"));
    }
  });*/
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
  /*Owner.findOne({ email_id: req.body.email_id }).then(owner => {
    if (!owner) {
      let errors = "No Account Found";
      res.writeHead(202, {
        "Content-Type": "text/plain"
      });
      response = {
        getSuccess: false,
        success: true,
        errMsg: errors
      };
      return res.end(JSON.stringify(response));
    } else {
      response = {
        success: true,
        delSuccess: true,
        errMsg: "Dish updatedd"
      };

      Owner.findOneAndUpdate(
        {
          email_id: req.body.email_id
        },
        {
          $set: {
            "sections.$[].rest_dish.$[].dish_name": req.body.dish_name,
            "sections.$[].rest_dish.$[].dish_price": req.body.dish_price,
            "sections.$[].rest_dish.$[].dish_desc": req.body.dish_desc
            // "sections.$[].rest_dish.$[].dish_image": req.body.dish_image
          }
        },
        { arrayFilters: [{ "sections.$.rest_dish.$._id": req.body.dish_id }] }
      )
        .then(dish =>
          res.json({
            success: true,
            delSuccess: true,
            errMsg: "Dish updatedd",
            result: dish
          })
        )
        .catch(err => res.status(400).json("Error updating dish"));
    }
  });*/
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
  /*Owner.findOne(
    { "sections.rest_dish._id": req.params.dish_id },
    { "sections.$_id": 0 }
  ).then(owner => {
    if (!owner) {
      let errors = "No dish Found";
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
        errMsg: "2222",
        dish: owner.sections
      };
      res.end(JSON.stringify(owner));
    }
  });*/
});
module.exports = router;
