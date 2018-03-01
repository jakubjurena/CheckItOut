const passport = require("passport");

module.exports = app => {
  /**
   *  GOOGLE OAUTH
   */
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/login"
    }),
    (req, res) => {
      res.redirect("/dashboard");
    }
  );

  /**
   *  FACEBOOK OAUTH
   */
  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
      scope: ["user_friends", "public_profile"]
    })
  );

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      failureRedirect: "/login"
    }),
    (req, res) => {
      res.redirect("/dashboard");
    }
  );

  /**
   *  LOCAL AUTH
   */

  app.post(
    "/auth/local/signup",
    passport.authenticate("local-signup", {
      failureRedirect: "/auth/local/signup/flash",
      failureFlash: true
    }),
    (req, res) => {
      res.send(req.user);
    }
  );

  app.get("/auth/local/signup/flash", (req, res) => {
    const flash = req.flash("signupMessage");
    res.status(403);
    if (flash.length === 0) {
      return res.send({
        errorMessage: "Server auth failed"
      });
    } else {
      return res.send({
        errorMessage: flash[0]
      });
    }
  });

  app.post(
    "/auth/local/login",
    passport.authenticate("local-login", {
      failureRedirect: "/auth/local/login/flash",
      failureFlash: true
    }),
    (req, res) => {
      res.send(req.user);
    }
  );

  app.get("/auth/local/login/flash", (req, res) => {
    const flash = req.flash("loginMessage");
    res.status(403);
    if (flash.length === 0) {
      return res.send({
        errorMessage: "Server auth failed"
      });
    } else {
      return res.send({
        errorMessage: flash[0]
      });
    }
  });

  /**
   *  COMMON METHODS
   */
  app.get("/auth/logout", (req, res) => {
    req.logout(); // function added to req by passport
    res.send("");
  });

  app.get("/auth/current_user", (req, res) => {
    res.send(req.user);
  });
};
