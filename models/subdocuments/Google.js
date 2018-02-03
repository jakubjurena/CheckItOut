const mongoose = require("mongoose");
const { Schema } = mongoose;

const googleSchema = new Schema({
  id: String,
  accessToken: String,
  refreshToken: String
}, {
  _id: false
});

module.exports = googleSchema;
