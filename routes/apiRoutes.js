const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const fetchMovieList = require("../middlewares/fetchMovieList");
const {updateFriends} = require("../services/Facebook");

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

  /*
    MOVIE LIST ROUTES
   */

  app.get("/api/movie_list/:id", requireLogin, fetchMovieList, (req, res) => {
    res.status(200).send(req.movieList);
  });

  app.post("/api/movie_list", requireLogin, (req, res) => {

  })
};
