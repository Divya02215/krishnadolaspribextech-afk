const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:3000";

app.use(cors({ origin: FRONTEND_ORIGIN, credentials: true }));
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const locationRoutes = require("./routes/location");
const passwordRoutes = require("./routes/password");

app.use("/api/accounts", authRoutes);
app.use("/api/accounts/location", locationRoutes);
app.use("/api/accounts", passwordRoutes); // forgot-password, verify-otp, reset-password

// DB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Mongo error:", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
