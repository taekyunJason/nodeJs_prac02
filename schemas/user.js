const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userNick: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userPw: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userInstitution: {
    type: String,
    required: true,
  },
  route: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("User", UserSchema);
