// src/models/OrderSchemas.js
const mongoose = require("mongoose");
const User = require("./UserSchemas");
const Owner = require("./OwnerSchema");
const Schema = mongoose.Schema;
const ChatSchema = new Schema(
  {
    namespace: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    owner_id: { type: mongoose.Schema.Types.ObjectId, ref: "Owner" },
    user_email: String,
    owner_email: String,
    user_name: String,
    owner_name: String,
    messages: [
      {
        sender: String,
        message: String
      }
    ]
  },
  { collection: "chat" }
);
module.exports = Chat = mongoose.model("Chat", ChatSchema);
