const mongoose = require("mongoose");
const axios = require("axios");


const Users = mongoose.model("users");
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
   */
  refreshFriends: async (userId) => {
    //TODO fetch friends from fb api and save them to the database
    console.log("USER ID: ", userId);
    if (userId === null) {
      return;
    }
    const user = await Users.findById({_id: userId});
    console.log("USER: ", user);
    if (user === null) {
      return;
    }

    const path = facebookApiURL + facebookMyFriendsPath + user.facebook.accessToken;
    console.log("PATH: ", path);
    const res = await axios.get(path);
    console.log("RESRPONSE BODY: ", res.data);

    user.facebook.friends = res.data.data;

    await user.save();
  }
};