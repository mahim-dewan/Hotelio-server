// src/controllers/auth.controller.js

const User = require("../models/user.model");
const {
  registerUser,
  loginUser,
  otpToRegister,
  registerOtpResendService,
} = require("../services/auth.service");
const { setAuthCookie, clearAuthCookie } = require("../utils/cookie");
const { generateToken, tokenVerify } = require("../utils/jwtToken");

/**
 * @desc Create an otp if email is valid
 * @route POST /api/auth/request-otp
 */
const requestRegister = async (req, res, next) => {
  try {
    await otpToRegister(req.body);

    res.status(200).json({ success: true, message: "OTP has been sent" });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Resend otp for register
 * @route POST /api/auth/registerOtp-resend
 */
const registerOtpResend = async (req, res, next) => {
  try {
    await registerOtpResendService(req.body);

    res.status(200).json({
      success: true,
      message: "New OTP has been sent. Please Check your Email.",
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Register new user
 * @route POST /api/auth/register
 */
const verifyRegister = async (req, res, next) => {
  try {
    const { token } = await registerUser(req.body);

    setAuthCookie(res, token);

    res.json({ success: true, message: "Registration Successfull." });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Login a user
 * @route POST /api/auth/login
 */
const login = async (req, res, next) => {
  try {    
    const token = await loginUser(req.body);

    setAuthCookie(res, token);

    return res
      .status(200)
      .json({ success: true, message: "Login Successfull" });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Verify logged-in user
 * @route GET /api/auth/me
 */
const verifyToken = async (req, res, next) => {
  try {
    const token = req?.cookies?.token;

    if (!token) return res.status(401).json({ message: "Not logged in" });

    const decoded = await tokenVerify(token);

    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Logout user
 * @route GET /api/auth/signout
 */
const signout = async (req, res, next) => {
  try {
    clearAuthCookie(res);

    res.json({ success: true, message: "Logged out" });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Google OAuth callback
 * @route GET /api/auth/google/callback
 */
const googleCallback = async (req, res, next) => {
  try {
    const { user } = req;

    const token = await generateToken(user);

    setAuthCookie(res, token);

    res.redirect(`${process.env.CLIENT_URL}`);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Facebook OAuth callback
 * @route GET /api/auth/facebook/callback
 */
const facebookCallback = async (req, res, next) => {
  try {
    const user = req?.user;

    const token = await generateToken(user);

    setAuthCookie(res, token);

    res.redirect(`${process.env.CLIENT_URL}`);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  requestRegister,
  verifyRegister,
  registerOtpResend,
  login,
  verifyToken,
  signout,
  googleCallback,
  facebookCallback,
};
