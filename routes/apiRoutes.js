module.exports = app => {
  app.get("/api", (req, res) => {
    res.send("For more info visit checkitout.devsoncoffee.com");
  });
};
