const mongoose = require("mongoose");
const { Schema } = mongoose;
const oauthAccountSchema = require("./OAuthAccount");

const userSchema = new Schema({
  name: String,
  facebookAccount: oauthAccountSchema,
  googleAccount: oauthAccountSchema
});

mongoose.model("users", userSchema);
