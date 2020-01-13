const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const { ObjectId } = require("mongoose").Types;

module.exports = function() {
  router.post("/continue-watch-movie", (req, res) => {
    const { _id: userId, continueWatch } = req.user;
    const { movieId, title, genre, type } = req.body;
    const movieAlreadyHave = continueWatch.some(
      item => item.movieId == movieId
    );
    if (movieAlreadyHave) {
      return res.sendStatus(403);
    }
    userModel
      .findByIdAndUpdate(userId, {
        $push: {
          continueWatch: {
            movieId,
            title,
            date: Date.now(),
            genre: genre.split(",")[0],
            type
          }
        }
      })
      .exec()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(403));
  });

  router.patch("/continue-watch-movie/update", (req, res, next) => {
    const { _id: userId } = req.user;
    const { movieId, toggler } = req.body;
    userModel
      .updateOne(
        {
          _id: ObjectId(userId),
          "continueWatch.movieId": movieId
        },
        {
          $set: { "continueWatch.$.isWatch": toggler }
        }
      )
      .exec()
      .then(() => res.sendStatus(200))
      .catch(err => next(err));
  });
  router.delete("/continue-watch-movie/delete", (req, res, next) => {
    const { _id: userId } = req.user;
    const { movieId } = req.query;
    userModel
      .findByIdAndUpdate(userId, {
        $pull: { continueWatch: { movieId } }
      })
      .exec()
      .then(() => res.sendStatus(200))
      .catch(err => res.json(err));
  });
  return router;
};
