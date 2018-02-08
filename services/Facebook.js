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
   * this function refresh fb friends of current user
   *
   * @param userId id of user who want to refresh fb friends
   * @return updatedUser when success, null otherwise
   */
  updateFriends: async (userId) => {
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
  }
};