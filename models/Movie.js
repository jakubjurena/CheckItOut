const mongoose = require("mongoose");
const { Schema } = mongoose;

const movieSchema = new Schema({
  tmdbId: String,
  imbdId: String,
  title: String,
  overview: String,
  genres: [
    {
      id: String,
      name: String
    }
  ],
  mainPosterPath: String,
  releaseDate: String,
  runtime: Number
});

/*
 *  For more details see TMDB api docs
 * 
 *  docs: developers.themoviedb.org/3
 */

mongoose.model("Movie", movieSchema);
