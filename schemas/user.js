const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userPw: {
    type: String,
    required: true,
  },
  userNick: {
    type: String,
    required: true,
  },
  userInstitution: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
