const express = require("express");
const router = express.Router();
const movieModel = require("../models/movies");
const userModel = require("../models/user");

module.exports = function() {
  router.patch("/update-rate-movie", (req, res) => {
    const { _id: userId, ratedMovies } = req.user;
    const { value, movieId } = req.body;
    const dublicateMovie = ratedMovies.find(item => item.movieId == movieId);
    if (dublicateMovie) {
      return res.sendStatus(403);
    }
    if (value > 10 || value < 0.5) {
      return res.sendStatus(418);
    }

    const updateUser = userModel.findByIdAndUpdate(userId, {
      $push: {
        ratedMovies: {
          movieId: movieId,
          rate: value
        }
      }
    });
    const updateMovie = movieModel.findByIdAndUpdate(movieId, {
      $inc: {
        totalUsersRate: value,
        totalUsersVotes: 1
      }
    });

    Promise.all([updateUser, updateMovie])
      .then(() => {
        res.sendStatus(200);
      })
      .catch(() => res.sendStatus(403));
  });
  return router;
};
