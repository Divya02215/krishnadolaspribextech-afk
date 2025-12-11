const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, trim: true },
    last_name: { type: String, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone_number: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    username: {
      type: String,
      unique: true,
      sparse: true, // allow many docs with null until profile is completed
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    is_adult: {
      type: Boolean,
      default: false,
    },

    profile_completed: {
      type: Boolean,
      default: false,
    },

    // NEW: interests array
    interests: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// Hash password before save
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
