// src/models/opt.model.js

const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    otp: { type: String, required: true },

    purpose: {
      type: String,
      enum: ["email_verification", "password_reset"],
      required: true,
    },
  },
  { timestamps: true },
);

// TTL Index: Automatically deletes document after 5 minutes
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

const OTP = mongoose.model("OTP", otpSchema);

module.exports = OTP;
