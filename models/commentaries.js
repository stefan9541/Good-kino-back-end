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
    ref: "user"
  },
  body: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

});

module.exports = mongoose.model("commentaries", commentariesModel);
