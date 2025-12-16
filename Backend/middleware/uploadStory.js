// C:\MERN\Backend\middleware\uploadStory.js
const fs = require("fs");
const path = require("path");

const uploadStoryBase64 = async (req, res, next) => {
  try {
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ message: "Image base64 is required" });
    }

    // Extract base64 data
    const matches = imageBase64.match(/^data:image\/(\w+);base64,(.+)$/);

    if (!matches) {
      return res.status(400).json({ message: "Invalid base64 format" });
    }

    const ext = matches[1];
    const base64Data = matches[2];

    const buffer = Buffer.from(base64Data, "base64");

    // Create uploads folder if not exists
    const uploadDir = path.join(__dirname, "../uploads/stories");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = `story_${Date.now()}.${ext}`;
    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, buffer);

    // Attach image path to request
    req.storyImagePath = `/uploads/stories/${fileName}`;

    next();
  } catch (err) {
    console.error("Base64 upload error:", err);
    res.status(500).json({ message: "Image upload failed" });
  }
};

module.exports = uploadStoryBase64;
