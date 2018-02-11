const mongoose = require("mongoose");
const { Schema } = mongoose;

const {friendRequestStatusEnum} = require("../config/enums");

/*
  requester is always last user who changed status

  Examples:
  user1 sent friend request to user2  => requester: user1, recipient: user2, status: "pending", ...
    - user2 accepted request          => requester: user2, recipient: user1, status: "accepted", ...
    - user2 declined request          => requester: user2, recipient: user1, status: "declined", ...

  if user1 blocked someone, blocked user can not request friendship with this user again until user1 do not remove this block
 */
const friendshipSchema = new Schema( {
  requester: { type: Schema.Types.ObjectId, ref: "User", required: true},
  recipient: { type: Schema.Types.ObjectId, ref: "User", required: true},
  status: { type: String, enum: friendRequestStatusEnum, default: "pending"},
  statusChangeDate: { type: Date, default: Date.now()},
  friendsFrom: Date
});

mongoose.model("Friendship", friendshipSchema);
