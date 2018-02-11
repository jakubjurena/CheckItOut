const mongoose = require("mongoose");
const _ = require("lodash");
const { Schema } = mongoose;

// subdocuments import
const googleSchema = require("./subdocuments/Google");
const facebookSchema = require("./subdocuments/Facebook");

const userSchema = new Schema({
  name: String,
  facebook: facebookSchema,
  google: googleSchema,
  registrationDate: { type: Date, default: Date.now()}
});

mongoose.model("User", userSchema);
