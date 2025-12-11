// C:\MERN\Backend\models\Location.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const locationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
      default: null,
      index: true, // not unique
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

// IMPORTANT: export a model, not the schema
const Location = mongoose.model("Location", locationSchema);
module.exports = Location;
