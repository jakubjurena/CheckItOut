const mongoose = require("mongoose");
const visibility = require("../enums/visibility");

const MovieList = mongoose.model("MovieList");

/**
 * Load movie list. If logged user have permissions, movie list will be save to HTTP request. If there is
 * any authentication error, HTTP response with status code is sent
 *
 * @param req HTTP request
 * @param res HTTP response
 * @param next function link to next operations
 * @return set movie list in HTTP request if authentication is ok, HTTP response with error code otherwise
 */
module.exports = (req, res, next) => {
  MovieList.find({_id: req.params.movieListId}, (err, movieList) => {
    if (err) return res.status(404).send("Movie list not found (check your movie list id)");

    switch (movieList.visibility) {
      case visibility.PRIVATE:
        if ( movieList.owner !== req.user.id) {
          return res.status(401).send("You do not have permissions to display this Movie list");
        }
        break;
      case visibility.FRIENDS:
        //TODO implement method isFriend, then similar if to PRIVATE movie list
        //meanwhile it behaves like PUBLIC
    }

    req.movieList = movieList;
    next();
  });


};

