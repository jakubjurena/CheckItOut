const express = require("express");

const app = express();

/**
 *  ROUTES
 */
require("./routes/apiRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  if (err) {
    console.log("Error occured");
  } else {
    console.log("Listening on port " + PORT);
  }
});