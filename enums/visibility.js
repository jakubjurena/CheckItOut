const visibility = {
  PRIVATE: "private",
  FRIENDS: "friends",
  PUBLIC: "public",
  LIST: [this.PRIVATE, this.FRIENDS, this.PUBLIC]
};

module.exports = Object.freeze(visibility);