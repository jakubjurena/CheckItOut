const mongoose = require("mongoose");
const { Schema } = mongoose;

const visibility = require("../enums/visibility");

const movieListSchema = new Schema ( {
  _owner: {type: Schema.Types.ObjectId, ref: "User", required: true},
  name: {type: String, required: true},
  overview: String,
  visibility: { type: String, enum: visibility.LIST, default: visibility.FRIENDS},
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
