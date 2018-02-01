const mongoose = require("mongoose");
const { Schema } = mongoose;

const oauthAccountSchema = new Schema({
  _id: false,
  id: String,
  accessToken: String,
  refreshToken: String
});

module.exports = oauthAccountSchema;
