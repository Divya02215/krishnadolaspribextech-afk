const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:3000";

app.use(cors({ origin: FRONTEND_ORIGIN, credentials: true }));
app.use(express.json({ limit: "10mb" }));

// Routes
const authRoutes = require("./routes/auth");
const locationRoutes = require("./routes/location");
const passwordRoutes = require("./routes/password");
const dobRoutes = require("./routes/dob");
const storyRoutes = require("./routes/story");
const suggestionRoutes = require("./routes/suggestions");
const followRoutes = require("./routes/follow");
const shareRoutes = require("./routes/share");
const feedRoutes = require("./routes/feed");
const messageRoutes = require("./routes/message");

app.use("/api/accounts", authRoutes);
app.use("/api/accounts/location", locationRoutes);
app.use("/api/accounts", passwordRoutes);
app.use("/api/accounts", dobRoutes);
app.use("/api/accounts", storyRoutes);
app.use("/api/accounts", suggestionRoutes);
app.use("/api/accounts", followRoutes);
app.use("/api/accounts", shareRoutes);
app.use("/api", feedRoutes);
app.use("/api/messages", messageRoutes);

// DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
