// C:\MERN\Backend\routes\story.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { createStory, getStories, getMe } = require("../controllers/storyController");

// CREATE STORY (Base64)
router.post("/story/create", authMiddleware, createStory);

// GET STORIES
router.get("/story", authMiddleware, getStories);

// GET CURRENT USER
router.get("/me", authMiddleware, getMe);

module.exports = router;
