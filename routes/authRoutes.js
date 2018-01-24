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
      failureRedirect: "/"
    }),
    (req, res) => {
      res.redirect("/");
    }
  );

  /**
   *  FACEBOOK OAUTH
   */
  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
      scope: ["user_friends"]
    })
  );

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      failureRedirect: "/"
    }),
    (req, res) => {
      res.redirect("/");
    }
  );

  /**
   *  COMMON METHODS
   */
  app.get("auth/logout", (req, res) => {
    req.logout(); // function added to req by passport
    res.redirect("/");
  });

  app.get("auth/current_user", (req, res) => {
    res.send(req.user);
  });
};
