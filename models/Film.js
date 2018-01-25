const mongoose = require("mongoose");
const { Schema } = mongoose;

const filmSchema = new Schema({
  tmdbId: String,
  imbdId: String,
  title: String,
  overview: String,
  grendes: [
    {
      id: String,
      name: String
    }
  ],
  popularity: Number,
  posterPath: String,
  releaseDate: String,
  runtime: Number,
  video: Boolean
});

/**
 *  For more details request TMDB api
 * 
 *  docs: developers.themoviedb.org/3
 */

mongoose.model("films", filmSchema);
