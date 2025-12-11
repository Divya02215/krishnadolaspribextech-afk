// C:\MERN\Backend\controllers\locationController.js
const Location = require("../models/Location");

// Save or update anonymous user location (no auth for now)
exports.saveLocation = async (req, res) => {
  try {
    let { latitude, longitude, city } = req.body;

    latitude = Number(latitude);
    longitude = Number(longitude);

    if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
      return res
        .status(400)
        .json({ error: "Latitude and longitude must be numbers." });
    }

    const userId = null; // anonymous for now

    // Upsert a single document for user: null
    const location = await Location.findOneAndUpdate(
      { user: userId },
      {
        user: userId,
        latitude,
        longitude,
        city: city || "",
      },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      message: "Location saved successfully.",
      location,
    });
  } catch (err) {
    console.error("Save location error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};
