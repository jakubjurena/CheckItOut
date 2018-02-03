const mongoose = require("mongoose");
const { Schema } = mongoose;

const { visibilityEnum } = require("../config/enums");

const movieListSchema = new Schema ( {
  _owner: {type: Schema.Types.ObjectId, ref: "User"},
  name: {type: String, required: true},
  overview: String,
  visibility: { type: String, enum: visibilityEnum, default: "friends"},
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
