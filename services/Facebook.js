const mongoose = require("mongoose");
const axios = require("axios");


const Users = mongoose.model("User");
const {facebookApiURL, facebookMyFriendsPath} = require("../config/constants");

module.exports = {

  /*
   *
   *  get this url to get friends
   *  https://graph.facebook.com/me/friends?access_token=<accesToken>
   *
   *  response body:
   *  {
   *    data: [{id: <friendId>, name:<friendName>}],
   *    paging: ...,
   *    summary: { total_count: <total_friend_count> }
   *  }
   *
   *  friends in data array are friends using this app, total_friend_count are total fb friend count
   *  (this two numbers are usually different)
   *
   */

  /**
   * this function refresh fb friends of current user synchronously
   *
   * @param userId id of user who want to refresh fb friends
   * @return updatedUser when success, null otherwise
   */
  updateFriendsSync: async (userId) => {
    //console.log("USER ID: ", userId);
    if (userId === null) {
      return null;
    }
    const user = await Users.findById({_id: userId});
    //console.log("USER: ", user);
    if (user === null) {
      return null;
    }

    const path = facebookApiURL + facebookMyFriendsPath + user.facebook.accessToken;
    //console.log("PATH: ", path);
    const res = await axios.get(path);
    //console.log("RESPONSE BODY: ", res.data);

    user.facebook.friends = res.data.data;
    user.facebook.friendsRefreshDate = Date.now();

    const updatedUser = await user.save();

    return updatedUser;
  },

  /**
   *  this function refresh fb friends of current user asynchronously
   *
   * @param userId id of user who want to refresh fb friends
   * @param callback where method put updated user
   */
  updateFriends: (userId, callback) => {
    //console.log("USER ID: ", userId);
    if (userId === null) {
      callback("User id couldn't be null", null)
    }
    Users.findById(userId).then(user => {
      //console.log("USER: ", user);
      if (user === null) {
        callback({ message: "User not found"}, null)
      }

      const path = facebookApiURL + facebookMyFriendsPath + user.facebook.accessToken;
      //console.log("PATH: ", path);
      axios.get(path).then(res => {
          //console.log("RESPONSE BODY: ", res.data);

          user.facebook.friends = res.data.data;
          user.facebook.friendsRefreshDate = Date.now();

          user.save( (err, updatedUser) => {
            if (err) {
              callback({message: "Error while updating in DB"}, null);
            }
            callback(null, updatedUser);
          })
        }).catch( (err) => {
        callback({message: "Axios error (on GET " + path + ")" }, null);
      });
      })
    }

};