const express = require("express");
const { register, verifyToken, signout, googleCallback } = require("../controllers/auth.controller");
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
    // failureRedirect: "/login",
    // successRedirect: "/api",
    session: false,
  }),
  googleCallback
);

module.exports = authRouter;
