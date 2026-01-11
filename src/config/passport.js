// src/config/passport.js

const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const { Strategy: FacebookStrategy } = require("passport-facebook");
const User = require("../models/user.model.js");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        // 1. Check if user exists with same provider + providerId
        let user = await User.findOne({
          provider: "google",
          providerId: profile.id,
        });

        if (user) {
          return done(null, profile);
        }

        // 2. Check if email already exists with another provider
        const existEmail = await User.findOne({ email });
        if (existEmail) {
          return done(
            null,
            false,
            "Email already registered with another provider"
          );
        }

        // 3. Create new user
        user = await User.create({
          name: profile.displayName,
          provider: "google",
          email: email,
          providerId: profile.id,
          photo: profile.photos[0].value,
        });

        done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: `${process.env.SERVER_URL}/auth/facebook/callback`,
      profileFields: ["id", "displayName", "emails", "photos"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        // 1. Check if user exists with same provider + providerId
        let user = await User.findOne({
          provider: "facebook",
          providerId: profile.id,
        });

        if (user) {
          return done(null, user);
        }

        // 2. Check if email already exists with another provider
        const existEmail = await User.findOne({ email });
        if (existEmail) {
          return done(
            null,
            false,
            "Email already registered with another provider"
          );
        }

        // 3. Create new user
        user = await User.create({
          name: profile.displayName,
          provider: "facebook",
          email: email,
          providerId: profile.id,
          photo: profile.photos[0].value,
        });

        done(null, profile);
      } catch (err) {
        done(err, null);
      }
    }
  )
);
