// src/utils/otp.util.js
const crypto = require("node:crypto");

// Generate a 6 digit OTP as STRING
const generateOTP = () => crypto.randomInt(100000, 1000000);

module.exports = {
  generateOTP,
};
