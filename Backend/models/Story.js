// C:\MERN\Backend\models\Story.js
const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    media: {
      type: String, // Path to image
      required: true,
    },
    caption: {
      type: String,
      default: "",
    },
    privacy: {
      type: String,
      enum: ["public", "followers"],
      default: "followers",
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
      index: { expires: 0 },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Story", storySchema);
