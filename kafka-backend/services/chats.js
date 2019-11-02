const Chat = require("../models/ChatSchema");

function handle_request(msg, callback) {
  var res = {};
  console.log("In handle chat request:" + JSON.stringify(msg));
  //   mongoose.connect(function(err, db) {
  //     if (err) {
  //       callback(null, "Cannot connect to db");
  //     } else {
  console.log("Connected to mongodb");
  console.log("Message Path:" + msg.path);
  if (msg.path === "getownerchats") {
    console.log("getownerchats msg.params" + JSON.stringify(msg.params));
    Chat.find({ owner_email: msg.params.email_id }).then(chat => {
      if (!chat) {
        let errors = "No chat Found";
        // res.writeHead(202, {
        //   "Content-Type": "text/plain"
        // });
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
          chat: chat
        };
        callback(null, { status: 200, response });
        // res.end(JSON.stringify(response));
      }
    });
  } else if (msg.path === "getchatdetails") {
    console.log("getchatdetails msg.params" + JSON.stringify(msg.params));
    Chat.findOne({ namespace: msg.params.nsid }).then(chat => {
      if (!chat) {
        let errors = "No chat Found";
        // res.writeHead(202, {
        //   "Content-Type": "text/plain"
        // });
        response = {
          authFlag: false,
          success: false,
          errMsg: errors
        };
        callback(null, { status: 202, response });
        // return res.end(JSON.stringify(response));
      } else {
        response = {
          success: true,
          getSuccess: true,
          errMsg: "",
          chat: chat
        };
        callback(null, { status: 200, response });
        // res.end(JSON.stringify(response));
      }
    });
  }
}

exports.handle_request = handle_request;
