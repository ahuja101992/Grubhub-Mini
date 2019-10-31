// src/models/OwnerSchemas.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OwnerSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true
    },
    last_name: String,
    email_id: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    phone_num: String,
    profile_image: String,
    resturant_name: {
      type: String,
      required: true
    },
    resturant_zipcode: {
      type: String,
      required: true
    },
    cuisine: String,
    sections: [
      {
        section_name: String,
        rest_dish: [
          {
            dish_name: String,
            dish_desc: String,
            dish_price: Number,
            dish_image: String
          }
        ]
      }
    ]
  },
  { collection: "owners" }
);
module.exports = Owner = mongoose.model("Owner", OwnerSchema);
