const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy;
const facebookStrategy = require("passport-facebook").Strategy;
const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
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
      User.findOne(
        {
          "google.id": profile.id
        },
        (err, existingUser) => {
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
            }).save((err, user) => {
              if (err)
                return done({ message: "Error while saving user" }, null);
              done(null, user);
            });
          }
        }
      );
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
      User.findOne(
        {
          "facebook.id": profile.id
        },
        (err, existingUser) => {
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
            }).save((err, newUser) => {
              if (err)
                return done({ message: "Error while saving user" }, null);
              FB.updateFriends(newUser.id, (err, user) => {
                if (err)
                  return done(
                    { message: "Error while updating FB friends" },
                    null
                  );
                done(null, user);
              });
            });
          }
        }
      );
    }
  )
);

/**
 *  LOCAL STRATEGY
 */

passport.use(
  "local-signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    (req, email, password, done) => {
      User.findOne({ "local.email": req.body.email }, (err, user) => {
        if (err) return done(err);
        if (user)
          return done(
            null,
            false,
            req.flash("signupMessage", "That email is already taken.")
          );

        const newUser = new User({
          name: req.body.name || req.body.email,
          local: {
            email: req.body.email,
            password: req.body.password
          }
        });

        newUser.save((err, user) => {
          if (err) return done(err);
          return done(null, user);
        });
      });
    }
  )
);

passport.use(
  "local-login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    (req, email, password, done) => {
      User.findOne({ "local.email": req.body.email }, (err, user) => {
        if (err) return done(err);
        if (!user)
          return done(
            null,
            false,
            req.flash("loginMessage", "User with given email was not found")
          );

        user.local.comparePassword(password, (err, isMatch) => {
          if (err) return done(err);
          if (isMatch) {
            return done(null, user);
          } else {
            return done(
              null,
              false,
              req.flash("loginMessage", "Wrong password")
            );
          }
        });
      });
    }
  )
);
