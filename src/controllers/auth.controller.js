const User = require("../models/user.model");
const { generateToken, tokenVerify } = require("../utils/jwtToken");

/**
 * @desc Register new user
 * @route POST /api/auth/register
 */
const register = async (req, res, next) => {
  res.send("New user create");
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

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

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

    res.cookie("token", token);

    res.redirect(`${process.env.CLIENT_URL}`);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  verifyToken,
  signout,
  googleCallback,
};
