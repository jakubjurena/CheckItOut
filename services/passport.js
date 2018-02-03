const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy;
const facebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

const FB = require("./Facebook");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new googleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({
        "google.id": profile.id
      });
      if (existingUser) {
        done(null, existingUser);
      } else {
        const user = await new User({
          name: profile.displayName,
          google: {
            id: profile.id,
            accessToken: accessToken,
            refreshToken: refreshToken
          }
        }).save();
        done(null, user);
      }
    }
  )
);

passport.use(
  new facebookStrategy(
    {
      clientID: keys.facebookAppID,
      clientSecret: keys.facebookAppSecret,
      callbackURL: "/auth/facebook/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({
        "facebook.id": profile.id
      });
      if (existingUser) {
        done(null, existingUser);
      } else {
        const user = await new User({
          name: profile.displayName,
          facebook: {
            id: profile.id,
            accessToken: accessToken,
            refreshToken: refreshToken
          }
        }).save();

        //I don't have to wait to result -> without await
        FB.updateFriends(user.id);

        done(null, user);
      }
    }
  )
);
