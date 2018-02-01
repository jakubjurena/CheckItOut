const mongoose = require("mongoose");
const http = require("http");

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
   * @param user user who want to refresh fb friends
   */
  refreshFriends: (user) => {
    //TODO fetch friends from fb api and save them to the database
  }
};