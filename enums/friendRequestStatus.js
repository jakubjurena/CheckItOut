const status = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  DECLINED: "declined",
  BLOCKED: "blocked",
  LIST: [this.PENDING, this.ACCEPTED, this.DECLINED, this.BLOCKED]
};

module.exports = Object.freeze(status);