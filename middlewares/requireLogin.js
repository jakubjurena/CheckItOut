/**
 * use this middleware function on the routes to verify user login
 *
 * @param req HTTP request
 * @param res HTTP response
 * @param next function link to next operations
 * @return send HTTP response with error code if user is not log in, let out otherwise
 */
module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: "You must be log in" });
  }
  next();
};
