// C:\MERN\Backend\routes/dob.js
const express = require("express");
const router = express.Router();
const { saveDob } = require("../controllers/dobController");
const authMiddleware = require("../middleware/authMiddleware");

// Protected route: user must be logged in
router.post("/save-dob/", authMiddleware, saveDob);

console.log("Route registered: POST /api/accounts/save-dob/");

module.exports = router;
