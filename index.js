/**
 *  IMPORTED MODULES
 */
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const flash = require("connect-flash");

/**
 *  CONSTANTS AND KEYS
 */
const keys = require("./config/keys");
const constants = require("./config/constants");

/**
 * EXPRESS INIT
 */
const app = express();

/**
 *  MONGOOSE
 */
require("./models/User");
require("./models/Friendship");
require("./models/Movie");
require("./models/MovieList");
require("./models/Rating");
mongoose.connect(keys.mongoURI);

/**
 *  BODY-PARSER AND COOKIE-SESSION
 */
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: constants.maxCookieAge,
    keys: [keys.cookieKeys]
  })
);

/**
 *  PASSPORT
 */
require("./services/passport");
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

/**
 *  ROUTES
 */
require("./routes/apiRoutes")(app);
require("./routes/movieListRoutes")(app);
require("./routes/authRoutes")(app);

app.listen(keys.port, err => {
  if (err) {
    console.log("Error occured");
  } else {
    console.log("Listening on port " + keys.port);
  }
});

module.exports = app;
