const mongoose = require("mongoose");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const SALT_WORK_FACTOR = 10;

const localSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    connectDate: { type: Date, default: Date.now() }
  },
  {
    _id: false
  }
);

localSchema.pre("save", function(next) {
  const user = this;
  if (!user.isModified("password")) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

/**
 * compare candidate password with hashed password
 *
 * @param candidatePassword
 * @param cb
 */
localSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err, false);
    cb(null, isMatch);
  });
};

// method hiding some Schema fields while sending model of this schema to user
localSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  return _.pick(userObject, ["connectDate"]);
};

module.exports = localSchema;
