const mongoose = require("mongoose");
const { Schema } = mongoose;

const visibility = require("../config/visibility");

const movieListSchema = new Schema ( {
  _owner: {type: Schema.Types.ObjectId, ref: "User"},
  name: {type: String, required: true},
  overview: String,
  visibility: { type: Number, enum: [visibility.PRIVATE, visibility.FRIENDS, visibility.PUBLIC], default: visibility.FRIENDS},
  likes: [{
    id: {type: Schema.Types.ObjectId, ref: "User"},
    date: Date
  }],
  movies:[{
    id: {type: Schema.Types.ObjectId, ref: "Movie"},
    addedDate: Date
  }]
});

mongoose.model("MovieList", movieListSchema);
