const mongoose = require("mongoose");
const {Schema} = mongoose;

const facebookSchema = new Schema({
  id: String,
  accessToken: String,
  refreshToken: String,
  friendsRefreshDate: { type: Date, default: Date.now()},
  friends: [ {
    _id: false,
    id: String,
    name: String
  }]
},{
  _id: false
});

module.exports = facebookSchema;