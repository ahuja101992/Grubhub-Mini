// src/models/userSchemas.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    first_name: String,
    last_name: String,
    password: {
      type: String,
      required: true
    },
    phone_num: String,
    profile_image: String,
    email_id: {
      type: String,
      required: true,
      unique: true
    }
  },
  { collection: "buyers" }
);
module.exports = User = mongoose.model("User", UserSchema);
