// C:\MERN\Backend\routes\auth.js
const express = require("express");
const router = express.Router();

const { login, signup } = require("../controllers/authController");

console.log("login type:", typeof login);
console.log("signup type:", typeof signup);

// POST /api/accounts/login/
router.post("/login/", login);

// POST /api/accounts/signup/
router.post("/signup/", signup);

module.exports = router;
