const mongoose = require("mongoose");
const { Schema } = mongoose;

const googleSchema = new Schema({
  _id: false,
  id: String,
  accessToken: String,
  refreshToken: String
});

module.exports = googleSchema;
