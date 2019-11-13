const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserModel = new Schema({
  googleId: {
    type: String,
    unique: true,
    index: {
      unique: true
    }
  },
  userName: {
    type: String,
    required: true
  },
  picture: {
    type: String,
  }
});

module.exports = mongoose.model("user", UserModel);