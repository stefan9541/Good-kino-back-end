const express = require("express");
const router = express.Router();
const UserModel = require("../models/user");
const moviesModel = require("../models/movies");

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

  router.get("/get-favorite-movies", (req, res) => {
    const { favoriteMovies } = req.user;
    let {
      byType = "all",
      sortedBy = "imdbRating",
      orderBy = "dec"
    } = req.query;

    if (byType === "all") byType = "";
    (orderBy === "dec") ? orderBy = -1 : orderBy = 1;

    moviesModel.find()
      .where("Type").regex(byType)
      .where("_id").in(favoriteMovies)
      .sort({ [sortedBy]: orderBy })
      .select({
        Released: 1,
        Title: 1,
        Poster: 1,
        Year: 1,
        Genre: 1,
        Type: 1
      })
      .exec()
      .then(movies => {
        res.json(movies);
      })
      .catch(() => res.sendStatus(404));
  });
  return router
}