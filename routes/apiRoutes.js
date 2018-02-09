const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const fetchMovieList = require("../middlewares/fetchMovieList");
const {updateFriends} = require("../services/Facebook");

const visibility = require("../config/visibility");

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

  /*
   * testing in client using axios in console
   *
   * const movieList = {"name": "New list", "overview": "overview"};
   *
   * axios.post("/api/movie_list", mov
   */
  app.post("/api/movie_list", requireLogin, (req, res) => {
    //TODO validate inputs
    new MovieList({
      _owner: req.user._id,
      name: req.body.name,
      overview: req.body.overview,
      visibility: req.body.visibility
    }).save((err, movieList) => {
      if (err)
        return res.status(500).send("Error while saving to DB. " + err.message);
      res.status(200).send(movieList);
    })
  });

  //TODO decide if fetchMovieList middleware is good idea
  app.get("/api/movie_list/:id", requireLogin, (req, res) => {

    MovieList.findById(req.params.id, (err, movieList) => {
      if (err || !movieList) return res.status(404).send("Movie list not found (check your movie list id)");

      switch (movieList.visibility) {
        case visibility.PRIVATE:
          if ( movieList._owner.toString() !== req.user.id) {
            return res.status(401).send("You do not have permissions to display this Movie list");
          }
          break;
        case visibility.FRIENDS:
          //TODO if requester is not owner or friend of owner reject (+ implementation of method isFriend/areFriends)
          //meanwhile it behaves like PUBLIC
      }

      res.status(200).send(movieList);
    });
  });

  //TODO validateOwnership middleware (update and delete can only owners)


  /*
    save movie list in middleware or fetch data from DB second time
    (first in middleware to deci de if logged user is owner,
    second time in route to remove or update)
   */

  app.delete("/api/movie_list/:id", requireLogin, (req, res) => {
    //TODO move to trash, after 30days it will be removed definitely
    MovieList.findByIdAndRemove(req.params.id, (err, deletedMovieList) => {
      if (err) return res.status(500).send("Server error (cannot delete movie list)");
      res.status(200).send(deletedMovieList);
    })

    /*
    req.movieList.delete((err, deletedMovieList) => {
      if (err) return res.status(500).send("Server error (cannot delete movie list)");
      res.status(200).send(deletedMovieList);
    });
    */
  });

  app.put("/api/movie_list/:id", requireLogin, (req, res) => {
    //TODO validate inputs
    MovieList.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          overview: req.body.overview,
          visibility: req.body.visibility
        },
        {new: true},
        (err, updatedMovieList) => {
      if (err) return res.status(500).send("Server error (cannot update movie list)");
      res.status(200).send(updatedMovieList);
    })
  })
};
