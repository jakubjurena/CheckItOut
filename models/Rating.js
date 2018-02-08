const mongoose = require("mongoose");
const { Schema } = mongoose;

const visibility = require("../config/visibility");

const movieRatingSchema = new Schema({
  _film: { type: Schema.Types.ObjectId, ref: "Film" },
  _publisher: { type: Schema.Types.ObjectId, ref: "User" },
  comment: String,
  rating: Number,
  visibility: { type: Number, enum: [visibility.PRIVATE, visibility.FRIENDS, visibility.PUBLIC], default: visibility.FRIENDS}
});

mongoose.model("Rating", movieRatingSchema);
