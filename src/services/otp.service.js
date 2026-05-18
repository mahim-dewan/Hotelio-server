// src/services/otp.service.js

const { generateOTP } = require("../utils/otp.util");
const { sendOtp } = require("../utils/email.util");
const emailVerifyOtpTemplate = require("../templates/emailVerify.template");
const OTP = require("../models/opt.model");
const forgotPasswordTemplate = require("../templates/forgotPassword.template");

/**
 * Create and send Email verify OTP
 */
const sendVerificationOtp = async (email) => {
  const generatedOtp = generateOTP();

  // 1. Clear any previous OTPs for this purpose
  await OTP.deleteMany({ email, purpose: "email_verification" });

  // 2. Generate and Save OTP
  const otp = new OTP({
    email,
    otp: generatedOtp,
    purpose: "email_verification",
  });
  const newOtp = await otp.save();

  // 3. Send OTP to Email
  sendOtp({
    to: otp.email,
    subject: "Email Verification",
    template: emailVerifyOtpTemplate(otp.otp),
  });

  return { email: newOtp.email };
};

/**
 * Password reset OTP service
 */
const sendForgotPasswordOtp = async (email) => {
  // 1. Clean up previous otp
  await OTP.deleteMany({ email, purpose: "password_reset" });

  // 2. Generate OTP and save in DB
  const otp = generateOTP();
  const otpData = new OTP({ email, otp, purpose: "password_reset" });
  await otpData.save();

  // 3. Send OTP to user's email
  sendOtp({
    to: email,
    subject: "Change Your Hotelio Password",
    template: forgotPasswordTemplate(otp),
  });
};

module.exports = { sendVerificationOtp, sendForgotPasswordOtp };
