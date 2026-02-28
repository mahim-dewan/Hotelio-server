// src/utils/cookie.js

const Expires_Day = 24 * 60 * 60 * 1000;

// Set cookie
const setAuthCookie = (res, token, options = {}) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * Expires_Day,
    ...options, // allow override when needed
  });
};

// Remove cookie
const clearAuthCookie = (res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
};

module.exports = {
  setAuthCookie,
  clearAuthCookie,
};
