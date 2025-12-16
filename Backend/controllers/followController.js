const Follow = require("../models/Follow");

// FOLLOW / UNFOLLOW
exports.toggleFollow = async (req, res) => {
  try {
    const followerId = req.user.id;
    const followingId = req.params.id;

    if (followerId === followingId) {
      return res.status(400).json({ message: "Cannot follow yourself" });
    }

    const existing = await Follow.findOne({
      follower: followerId,
      following: followingId,
    });

    if (existing) {
      await existing.deleteOne();
      return res.json({ followed: false });
    }

    await Follow.create({
      follower: followerId,
      following: followingId,
    });

    res.json({ followed: true });
  } catch (err) {
    console.error("Follow error:", err);
    res.status(500).json({ message: "Follow action failed" });
  }
};
