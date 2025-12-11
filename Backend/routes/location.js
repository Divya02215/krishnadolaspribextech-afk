// C:\MERN\Backend\routes\location.js
const express = require("express");
const router = express.Router();

const { saveLocation } = require("../controllers/locationController");

// Public for now (no auth)
router.post("/save/", saveLocation);

console.log("Route registered: POST /api/accounts/location/save/");

module.exports = router;
