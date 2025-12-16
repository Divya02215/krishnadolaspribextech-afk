const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { toggleFollow } = require("../controllers/followController");

router.post("/follow/:id/", authMiddleware, toggleFollow);

module.exports = router;
