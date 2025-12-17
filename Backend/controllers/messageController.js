const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

exports.sendPostMessage = async (req, res) => {
  try {
    const { recipients, text, sharedPostId } = req.body;
    const senderId = req.user.id;

    for (let receiverId of recipients) {
      let convo = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] },
      });

      if (!convo) {
        convo = await Conversation.create({
          participants: [senderId, receiverId],
        });
      }

      const message = await Message.create({
        conversation: convo._id,
        sender: senderId,
        text,
        sharedPost: sharedPostId,
      });

      convo.lastMessage = message._id;
      await convo.save();
    }

    res.json({ message: "Post shared successfully" });
  } catch (err) {
    console.error("Send post message error:", err);
    res.status(500).json({ message: "Failed to share post" });
  }
};
