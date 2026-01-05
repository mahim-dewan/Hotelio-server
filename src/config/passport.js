const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const User = require("../models/user.model.js");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({
        provider: "google",
        providerId: profile.id,
      });

      if (!user) {
        user = await User.create({
          name: profile.displayName,
          provider: "google",
          email: profile.emails[0].value,
          providerId: profile.id,
          photo: profile.photos[0].value
        });
      }

      done(null, user);
    }
  )
);
