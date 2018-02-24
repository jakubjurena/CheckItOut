const mongoose = require("mongoose");
const _ = require("lodash");
const { Schema } = mongoose;

// subdocuments import
const googleSchema = require("./subdocuments/Google");
const facebookSchema = require("./subdocuments/Facebook");
const localSchema = require("./subdocuments/Local");

const userSchema = new Schema({
  name: String,
  local: localSchema,
  facebook: facebookSchema,
  google: googleSchema,
  registrationDate: { type: Date, default: Date.now()}
});

mongoose.model("User", userSchema);
