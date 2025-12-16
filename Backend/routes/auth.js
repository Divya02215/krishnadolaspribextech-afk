const express = require("express");
const router = express.Router();

const {
  login,
  signup,
  completeProfile,
  updateInterests,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

// =========================
// AUTH ROUTES (PUBLIC)
// =========================

// Login
router.post("/login/", login);

// Signup
router.post("/signup/", signup);

// =========================
// AUTH ROUTES (PROTECTED)
// =========================

// Complete profile
router.post("/complete-profile/", authMiddleware, completeProfile);
console.log("Route registered: POST /api/accounts/complete-profile/");

// Update interests
router.post("/update-interests/", authMiddleware, updateInterests);
console.log("Route registered: POST /api/accounts/update-interests/");

// =========================
// GET CURRENT USER (REQUIRED)
// =========================
// Used by frontend: /api/accounts/me/
router.get("/me/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "username email profileImage"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Fetch current user error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

console.log("Route registered: GET /api/accounts/me/");

module.exports = router;
