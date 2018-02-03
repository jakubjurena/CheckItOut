const mongoose = require("mongoose");
const { Schema } = mongoose;

const { visibilityEnum } = require("../config/enums");

const movieRatingSchema = new Schema({
  _film: { type: Schema.Types.ObjectId, ref: "Film" },
  _publisher: { type: Schema.Types.ObjectId, ref: "User" },
  comment: String,
  rating: Number,
  visibility: { type: String, enum: visibilityEnum, default: "friends"}
});

mongoose.model("Rating", movieRatingSchema);
