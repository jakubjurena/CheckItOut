const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy;
const facebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("User");

const FB = require("./Facebook");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

/**
 *  GOOGLE STRATEGY
 */
passport.use(
  new googleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({
        "google.id": profile.id
      }, (err, existingUser) => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({
            name: profile.displayName,
            google: {
              id: profile.id,
              accessToken: accessToken,
              refreshToken: refreshToken
            }
          }).save( (err, user) => {
            if (err) return done({message: "Error while saving user"}, null);
            done(null, user);
          });
        }
      });
    }
  )
);

/**
 *  FACEBOOK STRATEGY
 */
passport.use(
  new facebookStrategy(
    {
      clientID: keys.facebookAppID,
      clientSecret: keys.facebookAppSecret,
      callbackURL: "/auth/facebook/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({
        "facebook.id": profile.id
      }, (err, existingUser) => {
        if (existingUser) {
          // is already registered
          done(null, existingUser);
        } else {
          // create user and save it to db
          new User({
            name: profile.displayName,
            facebook: {
              id: profile.id,
              accessToken: accessToken,
              refreshToken: refreshToken
            }
          }).save( (err, newUser) => {
            if (err) return done({message: "Error while saving user"}, null);
            FB.updateFriends(newUser.id, (err, user) => {
              if (err) return done({message: "Error while updating FB friends"}, null);
              done(null, user);
            });
          });
        }
      });
    }
  )
);
