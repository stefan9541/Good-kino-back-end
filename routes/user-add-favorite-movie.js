const express = require("express");
const router = express.Router();
const UserModel = require("../models/user");

module.exports = function () {
  router.patch("/add-favorite-movie", (req, res) => {
    const userId = req.user._id;
    const { movieId } = req.body;
    UserModel.findByIdAndUpdate(userId, { $addToSet: { favoriteMovies: movieId } })
      .then(() => {
        res.sendStatus(201);
      })
      .catch(() => res.sendStatus(401));
  });
  router.patch("/remove-favorite-movie", (req, res) => {
    const userId = req.user._id;
    const { movieId } = req.body;
    UserModel.findByIdAndUpdate(userId, { $pull: { favoriteMovies: movieId } })
      .then(() => {
        res.sendStatus(200);
      })
      .catch(() => res.sendStatus(401));
  });
  return router
}