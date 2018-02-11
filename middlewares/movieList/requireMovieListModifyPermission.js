const mongoose = require("mongoose");

const MovieList = mongoose.model("MovieList");

module.exports = (req, res, next) => {
  MovieList.findById(req.params.id, (err, movieList) => {
    if (err) return res.status(404).send("MovieList not found");

    //TODO collaborators can modify too
    if (movieList._owner.toString() !== req.user.id)
      return res.status(401).send("You can not modify this movie list");

    next();
  })
};