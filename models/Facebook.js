const mongoose = require("mongoose");
const {Schema} = mongoose;

const facebookSchema = new Schema({
  _id: false,
  id: String,
  accessToken: String,
  refreshToken: String,
  friendsRefreshDate: Date,
  friends: [ {
    id: String,
    name: String
  }]
});

module.exports = facebookSchema;