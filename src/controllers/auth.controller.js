// src/controllers/auth.controller.js

const User = require("../models/user.model");
const { registerUser, loginUser } = require("../services/auth.service");
const { setAuthCookie, clearAuthCookie } = require("../utils/cookie");
const { generateToken, tokenVerify } = require("../utils/jwtToken");

/**
 * @desc Register new user
 * @route POST /api/auth/register
 */
const register = async (req, res, next) => {
  try {
    await registerUser(req.body);

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
    console.log(decoded);

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
  register,
  login,
  verifyToken,
  signout,
  googleCallback,
  facebookCallback,
};
