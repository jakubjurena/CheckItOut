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
      scope: ["user_friends"]
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
