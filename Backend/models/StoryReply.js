// C:\MERN\Backend\models\StoryReply.js
const mongoose = require("mongoose");

const storyReplySchema = new mongoose.Schema(
  {
    story: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StoryReply", storyReplySchema);
