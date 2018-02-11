const mongoose = require("mongoose");
const { Schema } = mongoose;

const visibility = require("../enums/visibility");

const movieRatingSchema = new Schema({
  _film: { type: Schema.Types.ObjectId, ref: "Film" },
  _publisher: { type: Schema.Types.ObjectId, ref: "User" },
  comment: String,
  rating: Number,
  visibility: { type: Number, enum: visibility.LIST, default: visibility.FRIENDS}
});

mongoose.model("Rating", movieRatingSchema);
