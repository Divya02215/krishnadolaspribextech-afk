// C:\MERN\Backend\controllers/dobController.js
const User = require("../models/User");

// Save DOB for authenticated user
exports.saveDob = async (req, res) => {
  try {
    const { dob } = req.body; // Expected format: YYYY-MM-DD

    if (!dob) return res.status(400).json({ error: "DOB is required." });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found." });

    user.dob = new Date(dob);
    await user.save();

    return res.status(200).json({ message: "DOB saved successfully.", dob: user.dob });
  } catch (err) {
    console.error("Save DOB error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};
