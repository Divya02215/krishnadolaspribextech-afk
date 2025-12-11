const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const locationRoutes = require("./routes/location");

// /api/accounts/login, /api/accounts/signup, etc.
app.use("/api/accounts", authRoutes);

// /api/accounts/location/save/
app.use("/api/accounts/location", locationRoutes);

// DB Connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/univa_db")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
