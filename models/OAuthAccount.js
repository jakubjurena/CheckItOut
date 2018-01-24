const mongoose = require("mongoose");
const { Schema } = mongoose;

const oauthAccountSchema = new Schema({
  id: String,
  accessToken: String,
  refreshToken: String
});

module.exports = oauthAccountSchema;
