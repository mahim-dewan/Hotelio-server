// src/services/otp.service.js
const { generateOTP } = require("../utils/otp.util");
const { sendOtp } = require("../utils/email.util");
const emailVerifyOtpTemplate = require("../templates/emailVerify.template");
const OTP = require("../models/opt.model");
const User = require("../models/user.model");
const ApiError = require("../utils/apiError");

/**
 * Create and send Email verify OTP
 */
const sendVerificationOtp = async (email) => {
  // 1. Check if user already exists
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw ApiError(400, "User already registered with this email.");
  }

  // 2. Clear any previous OTPs for this purpose
  await OTP.deleteMany({ email, purpose: "email_verification" });

  // 3. Generate and Save OTP
  const otp = new OTP({
    email,
    otp: generateOTP(),
    purpose: "email_verification",
  });
  await otp.save();

  // 4. Send OTP to Email
  await sendOtp({
    to: otp.email,
    subject: "Email Verification",
    template: emailVerifyOtpTemplate(otp.otp),
  });

  return { email };
};

module.exports = { sendVerificationOtp };
