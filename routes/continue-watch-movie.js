const express = require("express");
const router = express.Router();
const userModel = require("../models/user");

module.exports = function () {
  router.patch("/continue-watch-movie", (req, res) => {
    const { _id: userId, continueWatch } = req.user;
    const { movieId, title, genre, type } = req.body;
    const movieAlreadyHave = continueWatch.find(item => item.movieId == movieId);
    if (movieAlreadyHave) {
      return res.sendStatus(403);
    }
    userModel.findByIdAndUpdate(userId, {
      $push: {
        continueWatch: {
          movieId,
          title,
          genre: genre.split(",")[0],
          type
        }
      }
    }).exec()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(403))
  });
  return router
}