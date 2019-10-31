// // var mongo = require('./mongo');
// var bcrypt = require("bcrypt");
// const User = require("../models/UserSchemas");
// var mongoose = require("mongoose");
// var Schema = mongoose.Schema;

// function handle_request(msg, callback) {
//   var res = {};
//   console.log("In handle signin request:" + JSON.stringify(msg));
//   //   mongoose.connect(function(err, db) {
//   //     if (err) {
//   //       callback(null, "Cannot connect to db");
//   //     } else {
//   console.log("Connected to mongodb");
//   console.log("Message Path:" + msg.path);
//   if (msg.path === "register") {
//     User.findOne({ email_id: msg.email_id }).then(user => {
//       if (user) {
//         let error = "Email Address Exists in Database.";
//         callback(null, { status: 400, error });
//       } else {
//         const newUser = new User({
//           first_name: msg.body.f_name,
//           last_name: msg.body.l_name,
//           email_id: msg.body.email_id,
//           password: msg.body.password,
//           phone_num: msg.body.phone_num
//         });
//         bcrypt.genSalt(10, (err, salt) => {
//           if (err) console.log("kjkj");
//           bcrypt.hash(newUser.password, salt, (err, hash) => {
//             if (err) throw err;
//             newUser.password = hash;
//             response = {
//               success: "true",
//               errMsg: "Successfully inserted into database.",
//               id: newUser._id
//             };
//             newUser
//               .save()
//               .then(newUser => {
//                 callback(null, { status: 200, response });
//               })
//               .catch(err => {
//                 callback(null, { status: 400, err });
//               });
//           });
//         });
//       }
//     });
//   }
//   //   });
//   //   }
//   /*if(msg.username == "bhavan@b.com" && msg.password =="a"){
//         res.code = "200";
//         res.value = "Success Login";

//     }
//     else{
//         res.code = "401";
//         res.value = "Failed Login";
//     }
//     callback(null, res);*/
// }

// exports.handle_request = handle_request;
