// C:\MERN\Backend\controllers\storyController.js
const Story = require("../models/Story");
const User = require("../models/User");
const fs = require("fs");
const path = require("path");

// GET CURRENT USER
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("username");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

// GET ALL STORIES (Return base64)
exports.getStories = async (req, res) => {
  try {
    const stories = await Story.find({ expiresAt: { $gt: new Date() } })
      .populate("user", "username")
      .sort({ createdAt: 1 });

    const formatted = await Promise.all(
      stories.map(async (s) => {
        let mediaBase64 = s.media;

        // Convert stored file path to base64 if it starts with /uploads
        if (s.media && s.media.startsWith("/uploads/stories/")) {
          const filePath = path.join(__dirname, "..", s.media);
          const fileBuffer = fs.readFileSync(filePath);
          mediaBase64 = fileBuffer.toString("base64");
        }

        return {
          id: s._id,
          username: s.user.username,
          media: mediaBase64,
          caption: s.caption,
          createdAt: s.createdAt,
        };
      })
    );

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch stories" });
  }
};

// CREATE STORY (Receive Base64)
exports.createStory = async (req, res) => {
  try {
    const { imageBase64, caption, privacy } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ message: "Media required" });
    }

    // Convert base64 → Buffer
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    // Generate unique filename
    const fileName = `story_${Date.now()}.png`;
    const filePath = path.join(__dirname, "..", "uploads", "stories", fileName);

    // Ensure folder exists
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    // Write file
    fs.writeFileSync(filePath, buffer);

    // Save story in DB
    const story = await Story.create({
      user: req.user.id,
      media: `/uploads/stories/${fileName}`,
      caption: caption || "",
      privacy: privacy || "followers",
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    res.status(201).json({
      message: "Story uploaded successfully",
      story,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create story" });
  }
};
