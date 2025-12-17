const Post = require("../models/Post");

exports.getFeed = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("creator", "username avatar")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (err) {
    console.error("Feed error:", err);
    res.status(500).json({ message: "Failed to load feed" });
  }
};
