const visibility = require("../../config/visibility");
const _ = require("lodash");

module.exports = (req, res, next) => {
  // required attributes only if it is post (new item)
  if (req.method === "POST"
      && (!req.body.name || !req.body.overview) )
    return res.status(400).send("Name and overview attributes are required");

  // pick only modifiable attributes
  req.body = _.pick(req.body, ["name", "overview", "visibility"]);

  // if visibility attribute is in request validate ENUM
  if (req.body.visibility) {
    for(let key in visibility) {
      if (visibility[key] === req.body.visibility) {
        next();
        return;
      }
    }
    return res.status(400).send("Value of visibility attribute is not valid");
  }

  next();
};