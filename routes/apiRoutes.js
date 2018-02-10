const mongoose = require("mongoose");
const {updateFriends} = require("../services/Facebook");


//middleware
const requireLogin = require("../middlewares/requireLogin");

const MovieList = mongoose.model("MovieList");

module.exports = app => {
  app.get("/api", (req, res) => {
    res.status(200).send("For more info visit checkitout.devsoncoffee.com");
  });

  /*
    USER ROUTES
   */

  app.get("/api/user/updateFriends", requireLogin, (req, res) => {
    updateFriends(req.user._id, (err, updatedUser) => {
      if (err) return res.status(500).send("Server error");
      res.status(200).send(updatedUser);
    });
  });



};
