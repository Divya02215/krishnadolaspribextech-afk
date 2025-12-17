const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { sendPostMessage } = require("../controllers/messageController");

router.post("/share-post/", authMiddleware, sendPostMessage);

module.exports = router;
