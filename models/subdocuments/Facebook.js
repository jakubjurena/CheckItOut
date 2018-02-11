const mongoose = require("mongoose");
const {Schema} = mongoose;

const _ = require("lodash");

const facebookSchema = new Schema({
  id: String,
  accessToken: String,
  refreshToken: String,
  friendsRefreshDate: { type: Date, default: Date.now()},
  friends: [ {
    _id: false,
    id: String,
    name: String
  }],
  connectDate: { type: Date, default: Date.now()}
},{
  _id: false
});

// method hiding some Schema fields while sending model of this schema to user
facebookSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  return _.pick(userObject, ["friendsRefreshDate", "friends", "connectDate"]);
};

module.exports = facebookSchema;