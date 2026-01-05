const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,

  provider: {
    type: String,
    enum: ["local", "google", "facebook"],
    default: "local"
  },

  providerId: String,
  photo: String
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User