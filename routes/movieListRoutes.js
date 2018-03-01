const mongoose = require("mongoose");
const visibility = require("../enums/visibility");

const MovieList = mongoose.model("MovieList");

//middleware
const requireLogin = require("../middlewares/requireLogin");
const requireMovieListModifyPermission = require("../middlewares/movieList/requireMovieListModifyPermission");
const validateMovieListInputs = require("../middlewares/movieList/validateMovieListInputs");

module.exports = (app) => {

  app.post("/api/movie_list", requireLogin, validateMovieListInputs, (req, res) => {
    new MovieList({
      _owner: req.user._id,
      name: req.body.name,
      overview: req.body.overview,
      visibility: req.body.visibility
    }).save((err, movieList) => {
      if (err)
        return res.status(500).send("Error while saving to DB.");
      res.status(200).send(movieList);
    })
  });

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

  /*
    save movie list in middleware or fetch data from DB second time
    (first in middleware to deci de if logged user is owner,
    second time in route to remove or update)
   */

  app.delete("/api/movie_list/:id", requireLogin, requireMovieListModifyPermission, (req, res) => {
    //TODO move to trash, after 30days it will be removed definitely
    MovieList.findByIdAndRemove(req.params.id, (err, deletedMovieList) => {
      if (err) return res.status(500).send("Server error (cannot delete movie list)");
      res.status(200).send("Movie list " + deletedMovieList.name + " was deleted");
    })

    /*
    req.movieList.delete((err, deletedMovieList) => {
      if (err) return res.status(500).send("Server error (cannot delete movie list)");
      res.status(200).send(deletedMovieList);
    });
    */
  });

  app.put("/api/movie_list/:id", requireLogin, requireMovieListModifyPermission, validateMovieListInputs, (req, res) => {
    MovieList.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (err, updatedMovieList) => {
          if (err) return res.status(500).send("Server error (cannot update movie list)");
          res.status(200).send(updatedMovieList);
        })
  })
}
