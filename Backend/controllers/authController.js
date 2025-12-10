// C:\MERN\Backend\controllers\authController.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Helpers
const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "15m",
  });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// LOGIN: POST /api/accounts/login/
exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    let errors = {};
    if (!identifier) errors.identifier = ["Identifier is required."];
    if (!password) errors.password = ["Password is required."];
    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    const user = await User.findOne({
      $or: [
        { email: identifier.toLowerCase() },
        { phone_number: identifier },
      ],
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = generateAccessToken(user._id);

    return res.json({
      user: {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_number: user.phone_number,
        token,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error." });
  }
};

// SIGNUP: POST /api/accounts/signup/
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

    // basic validations
    if (!email) errors.email = ["Email is required."];
    if (!phone_number) errors.phone_number = ["Phone number is required."];
    if (!password) errors.password = ["Password is required."];
    if (password && password.length < 6)
      errors.password = ["Password must be at least 6 characters."];
    if (password !== confirm_password)
      errors.confirm_password = ["Passwords do not match."];
    if (!is_adult)
      errors.is_adult = ["You must confirm that you are 18 or older."];

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    // check duplicates
    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      return res.status(400).json({
        email: ["Email already registered."],
      });
    }

    const existingPhone = await User.findOne({ phone_number });
    if (existingPhone) {
      return res.status(400).json({
        phone_number: ["Phone number already registered."],
      });
    }

    // create user
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
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({
      general: ["Server error. Please try again."],
    });
  }
};
