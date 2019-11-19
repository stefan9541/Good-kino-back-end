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
  favoriteMovies: [{ type: Schema.Types.ObjectId }],
  ratedMovies: [{
    _id: false,
    movieId: { type: Schema.Types.ObjectId, required: true },
    rate: { type: String, required: true }
  }]
});

module.exports = mongoose.model("user", UserModel);