const mongoose = require("mongoose");
const _ = require("lodash");
const { Schema } = mongoose;

const googleSchema = new Schema({
  id: String,
  accessToken: String,
  refreshToken: String,
  connectDate: { type: Date, default: Date.now() }
}, {
  _id: false
});

// method hiding some Schema fields while sending model of this schema to user
googleSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  return _.pick(userObject, ["connectDate"]);
};

module.exports = googleSchema;
