// controllers/shareController.js
const User = require("../models/User");
const Follow = require("../models/Follow");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

// GET SHARE LIST (followers first)
exports.getShareList = async (req, res) => {
  try {
    const userId = req.user.id;

    const following = await Follow.find({ follower: userId })
      .populate("following", "username");

    const users = following.map(f => ({
      id: f.following._id,
      username: f.following.username,
      avatar: `https://i.pravatar.cc/150?img=${f.following._id.toString().slice(-2)}`,
    }));

    res.json(users);
  } catch (err) {
    console.error("Share list error:", err);
    res.status(500).json({ message: "Failed to fetch share list" });
  }
};

// SEND MESSAGE (MULTI USER)
exports.sendMessage = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { recipients, text } = req.body;

    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return res.status(400).json({ message: "Recipients required" });
    }

    const results = [];

    for (const receiverId of recipients) {
      // Find or create conversation
      let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] },
      });

      if (!conversation) {
        conversation = await Conversation.create({
          participants: [senderId, receiverId],
        });
      }

      // Create message
      const message = await Message.create({
        conversation: conversation._id,
        sender: senderId,
        text: text || "",
      });

      conversation.lastMessage = message._id;
      await conversation.save();

      results.push({
        conversationId: conversation._id,
        messageId: message._id,
      });
    }

    res.status(201).json({
      message: "Message sent successfully",
      results,
    });
  } catch (err) {
    console.error("Send message error:", err);
    res.status(500).json({ message: "Failed to send message" });
  }
};
