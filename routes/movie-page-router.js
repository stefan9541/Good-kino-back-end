const expess = require("express");

const router = expess.Router();
const movieModel = require("../models/movies");

const moviePageRouter = () => {
  router.get("/movie", (req, res) => {
    const { movieId } = req.query;

    movieModel.findById(movieId, (err, film) => {
      if (err) {
        return res.sendStatus(404);
      }
      if (!film) {
        return res.sendStatus(404);
      }
      // const genre = film.Genre.split(" ")
      //   .slice(0, 1)
      //   .join(" ");

      movieModel
        .aggregate()
        .match({
          Type: film.Type,
          // Genre: { $regex: genre, $options: "ig" },
          Title: { $ne: film.Title }
        })
        .sample(4)
        .exec()
        .then(similarFilm => {
          res.json({ similarFilm, film });
        })
        .catch(() => res.status(400));
    });
  });

  return router;
};

module.exports = moviePageRouter;
