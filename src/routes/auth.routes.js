// src/routes/auth.routes.js

const express = require("express");
const {
  register,
  verifyToken,
  signout,
  googleCallback,
  facebookCallback,
} = require("../controllers/auth.controller");
const passport = require("passport");

const authRouter = express.Router();

authRouter.post("/register", register);

authRouter.get("/me", verifyToken);

authRouter.get("/signout", signout);

authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}?login=provider_mismatch`,
    session: false,
  }),
  googleCallback
);

authRouter.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
    prompt: "select_account",
  })
);

authRouter.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: `${process.env.CLIENT_URL}?login=provider_mismatch`,
    session: false,
  }),
  facebookCallback
);

module.exports = authRouter;
