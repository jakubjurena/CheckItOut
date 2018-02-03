const mongoose = require("mongoose");
const { Schema } = mongoose;

// subdocuments import
const googleSchema = require("./Google");
const facebookSchema = require("./Facebook");

const userSchema = new Schema({
  name: String,
  facebook: facebookSchema,
  google: googleSchema,
  registrationDate: { type: Date, default: Date.now()}
});

mongoose.model("users", userSchema);
