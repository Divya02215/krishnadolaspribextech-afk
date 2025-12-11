const express = require("express");
const router = express.Router();

const {
  login,
  signup,
  completeProfile,
  updateInterests,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// Auth routes
router.post("/login/", login);
router.post("/signup/", signup);

// Protected routes
router.post("/complete-profile/", authMiddleware, completeProfile);
console.log("Route registered: POST /api/accounts/complete-profile/");

// NEW: protected route for updating interests
router.post("/update-interests/", authMiddleware, updateInterests);
console.log("Route registered: POST /api/accounts/update-interests/");

module.exports = router;
