// routes/share.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getShareList, sendMessage } = require("../controllers/shareController");

router.get("/share/list/", authMiddleware, getShareList);
router.post("/share/send/", authMiddleware, sendMessage);

module.exports = router;
