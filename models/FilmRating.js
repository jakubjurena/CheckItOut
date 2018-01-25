const mongoose = require("mongoose");
const { Schema } = mongoose;

const filmRatingSchema = new Schema({
  _film: { type: Schema.Types.ObjectId, ref: "Film" },
  _publisher: { type: Schema.Types.ObjectId, ref: "User" },
  comment: String,
  rating: Number
});
