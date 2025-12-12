const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Otp = require("../models/Otp");

const OTP_LENGTH = 4;
const OTP_EXPIRY_MINUTES = 5;
const RESET_TOKEN_EXPIRY = process.env.JWT_EXPIRES_IN || "15m";

// Generate numeric OTP
const generateOtp = () => {
  let otp = "";
  for (let i = 0; i < OTP_LENGTH; i++) otp += Math.floor(Math.random() * 10);
  return otp;
};

// Dummy OTP sender (replace with email/SMS)
const sendOtpToUser = async ({ type, target, otp }) => {
  console.log(`[OTP SEND] To ${type} ${target}: OTP = ${otp}`);
  return true;
};

// Forgot password: send OTP
exports.forgotPassword = async (req, res) => {
  try {
    const { email, phone_number } = req.body;
    if (!email && !phone_number)
      return res.status(400).json({ error: "Email or phone_number is required." });

    const query = email ? { email: email.toLowerCase().trim() } : { phone_number: phone_number.trim() };
    const user = await User.findOne(query);
    if (!user) return res.status(404).json({ error: "User not found." });

    // Invalidate previous OTPs
    await Otp.updateMany({ user: user._id, purpose: "password_reset", used: false }, { used: true });

    const otpCode = generateOtp();
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

    await Otp.create({ user: user._id, otp: otpCode, expiresAt, purpose: "password_reset" });

    await sendOtpToUser({ type: email ? "email" : "phone", target: email || phone_number, otp: otpCode });

    const response = { message: "OTP sent successfully.", user_id: user._id };
    if (process.env.NODE_ENV !== "production") response.otp = otpCode;

    res.status(200).json(response);
  } catch (err) {
    console.error("forgotPassword error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Verify OTP: generate secure reset token
exports.verifyOtp = async (req, res) => {
  try {
    const { otp, email, phone_number } = req.body;
    if (!otp || (!email && !phone_number))
      return res.status(400).json({ error: "OTP and user identifier required." });

    const query = email ? { email: email.toLowerCase().trim() } : { phone_number: phone_number.trim() };
    const user = await User.findOne(query);
    if (!user) return res.status(404).json({ error: "User not found." });

    const otpDoc = await Otp.findOne({ user: user._id, otp, purpose: "password_reset", used: false });
    if (!otpDoc) return res.status(400).json({ error: "Invalid OTP." });
    if (new Date() > otpDoc.expiresAt) return res.status(400).json({ error: "OTP expired." });

    otpDoc.used = true;
    await otpDoc.save();

    const resetToken = jwt.sign({ id: user._id, type: "password_reset" }, process.env.JWT_SECRET, {
      expiresIn: RESET_TOKEN_EXPIRY,
    });

    res.status(200).json({ message: "OTP verified.", reset_token: resetToken, user_id: user._id });
  } catch (err) {
    console.error("verifyOtp error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  try {
    const { reset_token, new_password, confirm_password } = req.body;
    if (!reset_token || !new_password || !confirm_password)
      return res.status(400).json({ error: "reset_token and password required." });

    if (new_password !== confirm_password)
      return res.status(400).json({ error: "Passwords do not match." });
    if (new_password.length < 6)
      return res.status(400).json({ error: "Password must be at least 6 characters." });

    let decoded;
    try {
      decoded = jwt.verify(reset_token, process.env.JWT_SECRET);
    } catch {
      return res.status(401).json({ error: "Invalid or expired reset token." });
    }

    if (!decoded || decoded.type !== "password_reset")
      return res.status(401).json({ error: "Invalid reset token." });

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ error: "User not found." });

    user.password = new_password;
    await user.save();

    await Otp.updateMany({ user: user._id, purpose: "password_reset" }, { used: true });

    res.status(200).json({ message: "Password reset successfully." });
  } catch (err) {
    console.error("resetPassword error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};
