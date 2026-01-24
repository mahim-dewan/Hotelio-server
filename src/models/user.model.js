// src/models/user.model.js

const mongoose = require("mongoose");
const { makeHashPassword } = require("../utils/bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    password: String,

    provider: {
      type: String,
      enum: ["local", "google", "facebook"],
      default: "local",
    },

    providerId: String,
    photo: String,

    role: {
      type: String,
      enum: ["USER", "MODARATOR", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true },
);

// mongoose pre hook
userSchema.pre("save", async function (next) {
  // Skip if password doesn't exist (OAuth users)
  if (!this.password) return next();
  
  const hashedPassword = await makeHashPassword(this.password);
  this.password = hashedPassword;
});
const User = mongoose.model("User", userSchema);

module.exports = User;
