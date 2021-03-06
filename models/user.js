const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserModel = new Schema({
  googleId: {
    type: String,
    index: {
      unique: true,
      sparse: true
    }
  },
  email: {
    type: String,
    index: {
      unique: true,
      sparse: true
    }
  },
  password: {
    type: String,
    minlength: 5
  },
  userName: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    default: "https://anipoisk.org/templates/Animeshnik/dleimages/noavatar.png"
  },
  publicAvatarId: {
    type: String
  },
  favoriteMovies: [
    {
      type: Schema.Types.ObjectId
    }
  ],
  ratedMovies: [
    {
      _id: false,
      movieId: { type: Schema.Types.ObjectId, required: true },
      rate: { type: String, required: true }
    }
  ],
  continueWatch: [
    {
      _id: false,
      movieId: { type: Schema.Types.ObjectId, required: true },
      type: { type: String, required: true },
      genre: { type: String, required: true },
      title: { type: String, required: true },
      date: { type: Number },
      isWatch: { type: Boolean, default: false }
    }
  ]
});

module.exports = mongoose.model("user", UserModel);
