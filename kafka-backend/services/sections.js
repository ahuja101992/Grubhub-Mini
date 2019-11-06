const User = require("../models/UserSchemas");
const Owner = require("../models/OwnerSchema");
const bcrypt = require("bcrypt");
const secret = "CMPE_273_grbhub";
const passport = require("passport");
const jwt = require("jsonwebtoken");

function handle_request(msg, callback) {
  var res = {};
  console.log("In handle sections request:" + JSON.stringify(msg));
  console.log("Connected to mongodb");
  console.log("Message Path:" + msg.path);

  if (msg.path === "addsection") {
    const email_id = msg.body.email_id;
    console.log("addsection msg.body" + JSON.stringify(msg.body));

    Owner.findOne({ email_id: email_id }).then(owner => {
      if (!owner) {
        let errors = "No Account Found";
        response = {
          authFlag: false,
          success: false,
          getSuccess: false,
          errMsg: errors
        };
        callback(null, { status: 202, response });
        // return res.end(JSON.stringify(response));
      } else {
        Owner.findOne({ "sections.section_name": msg.body.section_name }).then(
          section => {
            if (section) {
              let error = "Section Already exists for the restaurant.";
              response = {
                authFlag: false,
                success: true,
                getSuccess: false,
                errMsg: error
              };
              callback(null, { status: 202, response });
              //   return res.end(JSON.stringify(response));
            } else {
              const sec = new Owner({
                section_name: msg.body.section_name
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
                    sections: { section_name: msg.body.section_name }
                  }
                },
                { upsert: true }
              )
                .then(sec => {
                  callback(null, { status: 200, response });
                })
                .catch(err => {
                  callback(null, { status: 200, err });
                });
            }
          }
        );
      }
    });
  } else if (msg.path === "insertdish") {
    const email_id = msg.body.email_id;
    console.log("insertdish msg.body" + JSON.stringify(msg.body));
    Owner.findOne({ email_id: email_id }).then(owner => {
      if (!owner) {
        let errors = "No Account Found";
        response = {
          authFlag: false,
          success: true,
          errMsg: errors
        };
        callback(null, { status: 202, response });
        // return res.end(JSON.stringify(response));
      } else {
        Owner.findOne({
          email_id: email_id,
          "sections.rest_dish.dish_name": msg.body.dish_name
        }).then(dishes => {
          if (dishes) {
            let error = "Dish already exists for the restaurant.";
            response = {
              authFlag: false,
              success: true,
              dishSuccess: false,
              errMsg: error
            };
            callback(null, { status: 200, response });
          } else {
            const dish = new Owner({
              dish_name: msg.body.dish_name,
              dish_desc: msg.body.dish_desc,
              dish_price: msg.body.dish_price,
              dish_image: msg.body.dish_image
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
                "sections.section_name": msg.body.type
              },
              {
                $push: {
                  "sections.$.rest_dish": {
                    dish_name: msg.body.dish_name,
                    dish_desc: msg.body.dish_desc,
                    dish_price: msg.body.dish_price,
                    dish_image: msg.body.dish_image
                  }
                }
              }
            )
              .then(dish => {
                callback(null, { status: 200, response });
              })
              .catch(err => {
                callback(null, { status: 200, err });
              });
          }
        });
      }
    });
  } else if (msg.path === "getsection") {
    console.log("adddish msg.body" + JSON.stringify(msg.params));
    Owner.findOne({ email_id: msg.params.email_id }).then(owner => {
      if (!owner) {
        let errors = "No Account Found";
        response = {
          authFlag: false,
          success: true,
          errMsg: errors
        };
        callback(null, { status: 200, response });
        // return res.end(JSON.stringify(response));
      } else {
        response = {
          success: true,
          getSuccess: true,
          errMsg: "",
          sections: owner.sections
        };
        callback(null, { status: 202, response });
        // res.end(JSON.stringify(response));
      }
    });
  } else if (msg.path === "getbuydishes") {
    console.log("getbuydishes msg.body" + JSON.stringify(msg.params));
    Owner.findOne({ email_id: msg.params.email_id }).then(owner => {
      if (!owner) {
        let errors = "No Account Found";
        response = {
          authFlag: false,
          success: true,
          errMsg: errors
        };
        callback(null, { status: 202, response });
        // return res.end(JSON.stringify(response));
      } else {
        response = {
          success: true,
          getSuccess: true,
          errMsg: "",
          result: owner.sections
        };
        callback(null, { status: 200, response });
        // res.end(JSON.stringify(response));
      }
    });
  } else if (msg.path === "delsection") {
    console.log("delsection msg.body" + JSON.stringify(msg.body));
    Owner.findOne({ email_id: msg.body.email_id }).then(owner => {
      if (!owner) {
        let errors = "No Account Found";
        response = {
          delSecSuccess: false,
          success: true,
          errMsg: errors
        };
        callback(null, { status: 202, response });
        // return res.end(JSON.stringify(response));
      } else {
        response = {
          success: true,
          delSecSuccess: true,
          result: owner
        };

        Owner.update(
          {
            email_id: msg.body.email_id,
            "sections.section_name": msg.body.type
          },
          {
            $pull: {
              sections: { section_name: msg.body.type }
            }
          }
        )
          .then(dish => {
            callback(null, { status: 200, response });
          })
          .catch(err => {
            callback(null, { status: 202, err });
          });
      }
    });
  } else if (msg.path === "deletedish") {
    Owner.findOne({ email_id: msg.body.email_id }).then(owner => {
      if (!owner) {
        let errors = "No Account Found";
        response = {
          delSuccess: false,
          success: true,
          errMsg: errors
        };
        callback(null, { status: 202, response });
        // return res.end(JSON.stringify(response));
      } else {
        response = {
          success: true,
          delSuccess: true,
          errMsg: "Dish deleted"
        };
        Owner.update(
          {
            email_id: msg.body.email_id,
            "sections.rest_dish._id": msg.body.dish_id
          },
          {
            $pull: {
              "sections.$[].rest_dish": { _id: msg.body.dish_id }
            }
          }
        )
          .then(dish => {
            callback(null, { status: 200, response });
          })
          .catch(err => {
            callback(null, { status: 202, err });
          });
      }
    });
  } else if (msg.path === "updatedish") {
    console.log("updatedish msg.body" + JSON.stringify(msg.body));
    Owner.findOne({ email_id: msg.body.email_id }).then(owner => {
      if (!owner) {
        let errors = "No Account Found";
        response = {
          getSuccess: false,
          success: true,
          errMsg: errors
        };
        callback(null, { status: 202, response });
        //   return res.end(JSON.stringify(response));
      } else {
        response = {
          success: true,
          delSuccess: true,
          errMsg: "Dish updated"
          // result: dish
        };
        Owner.findOneAndUpdate(
          {
            email_id: msg.body.email_id
          },
          {
            $set: {
              "sections.$[sec].rest_dish.$[dish].dish_name": msg.body.dish_name,
              "sections.$[sec].rest_dish.$[dish].dish_price":
                msg.body.dish_price,
              "sections.$[sec].rest_dish.$[dish].dish_desc": msg.body.dish_desc
            }
          },
          {
            arrayFilters: [
              { "sec.section_name": msg.body.section_name },
              { "dish._id": msg.body.dish_id }
            ]
          }
        )
          .then(dish => {
            callback(null, { status: 200, response });
          })
          .catch(err => {
            callback(null, { status: 202, err });
          });
      }
    });
  } else if (msg.path === "getdish") {
    console.log("getdish msg.params" + JSON.stringify(msg.params));
    Owner.findOne(
      { "sections.rest_dish._id": msg.params.dish_id },
      { "sections.$_id": 0 }
    ).then(owner => {
      if (!owner) {
        let errors = "No dish Found";
        response = {
          authFlag: false,
          success: true,
          errMsg: errors
        };
        callback(null, { status: 202, response });
        // return res.end(JSON.stringify(response));
      } else {
        response = {
          success: true,
          getSuccess: true,
          errMsg: "2222",
          dish: owner.sections
        };
        callback(null, { status: 200, response });
        // res.end(JSON.stringify(owner));
      }
    });
  }
}

exports.handle_request = handle_request;
