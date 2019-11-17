const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserModel = new Schema({
  googleId: {
    type: String,
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
  },
  favoriteMovies: [{ type: Schema.Types.ObjectId }]
});

module.exports = mongoose.model("user", UserModel);