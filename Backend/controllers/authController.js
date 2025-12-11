const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Helpers
const generateAccessToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

const generateRefreshToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

// LOGIN
exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    let errors = {};
    if (!identifier) errors.identifier = ["Identifier is required."];
    if (!password) errors.password = ["Password is required."];
    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    const user = await User.findOne({
      $or: [
        { email: identifier.toLowerCase() },
        { phone_number: identifier },
      ],
    });

    if (!user) return res.status(400).json({ message: "Invalid credentials." });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials." });

    const token = generateAccessToken(user._id);

    return res.json({
      user: {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_number: user.phone_number,
        username: user.username,
        profile_completed: user.profile_completed,
        token,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error." });
  }
};

// SIGNUP
exports.signup = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phone_number,
      password,
      confirm_password,
      is_adult,
    } = req.body;

    let errors = {};
    if (!email) errors.email = ["Email is required."];
    if (!phone_number) errors.phone_number = ["Phone number is required."];
    if (!password) errors.password = ["Password is required."];
    if (password && password.length < 6)
      errors.password = ["Password must be at least 6 characters."];
    if (password !== confirm_password)
      errors.confirm_password = ["Passwords do not match."];
    if (!is_adult)
      errors.is_adult = ["You must confirm that you are 18 or older."];

    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingEmail)
      return res.status(400).json({ email: ["Email already registered."] });

    const existingPhone = await User.findOne({ phone_number });
    if (existingPhone)
      return res.status(400).json({
        phone_number: ["Phone number already registered."],
      });

    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      phone_number,
      password,
      is_adult,
    });

    const access_token = generateAccessToken(user._id);
    const refresh_token = generateRefreshToken(user._id);

    return res.status(201).json({
      access_token,
      refresh_token,
      user: {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_number: user.phone_number,
        is_adult: user.is_adult,
        profile_completed: user.profile_completed,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res
      .status(500)
      .json({ general: ["Server error. Please try again."] });
  }
};

// COMPLETE PROFILE
exports.completeProfile = async (req, res) => {
  try {
    const { first_name, last_name, username } = req.body;

    if (!username)
      return res.status(400).json({ error: "Username is required." });

    const exists = await User.findOne({ username });
    if (exists)
      return res.status(400).json({ error: "Username already taken." });

    const user = await User.findById(req.user.id);

    user.first_name = first_name || user.first_name;
    user.last_name = last_name || user.last_name;
    user.username = username.toLowerCase();
    user.profile_completed = true;

    await user.save();

    return res.json({ message: "Profile completed successfully." });
  } catch (err) {
    console.error("Profile completion error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// NEW: UPDATE INTERESTS
exports.updateInterests = async (req, res) => {
  try {
    const { interests } = req.body;

    if (!Array.isArray(interests)) {
      return res
        .status(400)
        .json({ error: "Interests must be an array of strings." });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    user.interests = interests;
    await user.save();

    return res.json({
      message: "Interests updated successfully.",
      interests: user.interests,
    });
  } catch (err) {
    console.error("Update interests error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};
