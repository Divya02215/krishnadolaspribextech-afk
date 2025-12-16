const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getSuggestions } = require("../controllers/suggestionController");

router.get("/suggestions/", authMiddleware, getSuggestions);

module.exports = router;
