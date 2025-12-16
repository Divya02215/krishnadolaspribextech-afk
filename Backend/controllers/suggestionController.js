const User = require("../models/User");
const Follow = require("../models/Follow");

// GET SUGGESTED USERS
exports.getSuggestions = async (req, res) => {
  try {
    const currentUserId = req.user.id;

    // Users already followed
    const following = await Follow.find({ follower: currentUserId })
      .select("following");

    const followingIds = following.map(f => f.following);

    const users = await User.find({
      _id: { $ne: currentUserId, $nin: followingIds },
      username: { $exists: true },
    })
      .limit(10)
      .select("username");

    const response = users.map(u => ({
      id: u._id,
      username: u.username,
      avatar: `https://i.pravatar.cc/150?img=${u._id.toString().slice(-2)}`,
      mutuals: "Suggested for you",
      is_following: false,
    }));

    res.json(response);
  } catch (err) {
    console.error("Suggestions error:", err);
    res.status(500).json({ message: "Failed to load suggestions" });
  }
};
