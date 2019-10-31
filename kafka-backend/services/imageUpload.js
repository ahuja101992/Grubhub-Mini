const User = require("../models/UserSchemas");
const Owner = require("../models/OwnerSchema");

function handle_request(msg, callback) {
  var res = {};
  console.log("In handle image update request");
  console.log("Connected to mongodb");
  console.log("Message Path:" + typeof msg.path);

  if (msg.path === "imgupload") {
    // const email_id = msg.params.email_id;
    console.log("hello test");
    console.log("imgupload msg" + msg.file.location);
    User.findOneAndUpdate(
      { email_id: msg.params.email_id },
      { profile_image: msg.file.location }
    )
      .then(user => {
        callback(null, { status: 200, imageUrl: msg.file.location });
        // return res.json({ imageUrl: msg.file.location });
      })
      .catch(err => {
        callback(null, { status: 202, response: "error sendind response" });
      });
  } else if (msg.path === "resimgupload") {
    const email_id = msg.params.email_id;
    console.log("Message params" + JSON.stringify(msg.params));
    console.log("imgupload msg for res " + msg.file.location);
    Owner.findOneAndUpdate(
      { email_id: msg.params.email_id },
      { profile_image: msg.file.location }
    )
      .then(owner => {
        // console.log(JSON.stringify(owner));
        callback(null, { status: 200, imageUrl: msg.file.location });
        // return res.json({ imageUrl: msg.file.location });
      })
      .catch(err => {
        callback(null, { status: 202, response: "error sendind response" });
      });
  } else if (msg.path === "dishimgupload") {
    console.log("inside dish image upload");
    Owner.findOneAndUpdate(
      {
        email_id: msg.query.email_id
      },
      {
        $set: {
          "sections.$[sec].rest_dish.$[dish].dish_image": msg.file.location
        }
      },
      {
        arrayFilters: [
          { "sec.section_name": msg.query.section_name },
          { "dish._id": msg.query.dish_id }
        ]
      }
    )
      .then(owner => {
        // console.log(JSON.stringify(owner));
        callback(null, { status: 200, imageUrl: msg.file.location });
        // return res.json({ imageUrl: msg.file.location });
      })
      .catch(err => {
        callback(null, { status: 202, response: "error sendind response" });
      });
  }
}
exports.handle_request = handle_request;
