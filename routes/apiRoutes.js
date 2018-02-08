const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const fetchMovieList = require("../middlewares/fetchMovieList");
const {updateFriends} = require("../services/Facebook");

const MovieList = mongoose.model("MovieList");

module.exports = app => {
  app.get("/api", (req, res) => {
    res.send("For more info visit checkitout.devsoncoffee.com");
  });


  /*
    USER ROUTES
   */

  app.get("/api/user/updateFriends", requireLogin, async (req, res) => {
    const user = await updateFriends(req.user._id);

    res.send(user);
  });

  /*
    MOVIE LIST ROUTES
   */

  app.get("/api/movie_list/:id", requireLogin, fetchMovieList, async (req, res) => {
    res.send(req.movieList);
  });
};
