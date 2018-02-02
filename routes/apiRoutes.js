const requireLogin = require("../middlewares/requireLogin");
const {updateFriends} = require("../services/Facebook");

module.exports = app => {
  app.get("/api", (req, res) => {
    res.send("For more info visit checkitout.devsoncoffee.com");
  });


  /*
    USER ROUTES
   */

  app.get("/api/user/updateFriends", requireLogin, async (req, res) => {
    const user = await updateFriends(req.user._id);

    res.send(user);
  })
};
