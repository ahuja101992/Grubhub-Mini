// src/models/OrderSchemas.js
const mongoose = require("mongoose");
const User = require("./UserSchemas");
const Owner = require("./OwnerSchema");
const Schema = mongoose.Schema;
const OrderSchema = new Schema(
  {
    buyer_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rest_id: { type: mongoose.Schema.Types.ObjectId, ref: "Owner" },
    buy_email_id: String,
    rest_email_id: String,
    user: {
      first_name: String,
      last_name: String,
      contact: String
    },
    restuarant_name: String,
    address: String,
    status: String,
    total_price: Number,
    items: [
      {
        item_name: String,
        item_price: String,
        item_image: String,
        item_description: String,
        count: Number
      }
    ]
  },
  { collection: "orders" }
);
module.exports = Order = mongoose.model("Order", OrderSchema);
