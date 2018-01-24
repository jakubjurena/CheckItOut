const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");

const app = express();

/**
 *  MONGOOSE SETTING
 */
require("./models/User");

mongoose.connect(keys.mongoURI);

/**
 *  ROUTES
 */
require("./routes/apiRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, err => {
  if (err) {
    console.log("Error occured");
  } else {
    console.log("Listening on port " + PORT);
  }
});
