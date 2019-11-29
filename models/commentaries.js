const mongoose = require("mongoose");

const { Schema } = mongoose;

const commentariesModel = new Schema({
  movieId: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true
  },
  author: {
    type: Schema.Types.ObjectId,
  },
  body: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  likes: [{
    type: Schema.Types.ObjectId,
    default: []
  }],
  dislikes: [{
    type: Schema.Types.ObjectId,
    default: []
  }],
});

module.exports = mongoose.model("commentaries", commentariesModel);
