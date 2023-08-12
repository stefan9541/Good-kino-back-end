const express = require("express");

const router = express.Router();
const moviesModel = require("../models/movies");

const filterFormRouter = () => {
  router.get("/filter", (req, res) => {
    const {
      sortedBy,
      byType,
      byGenre,
      page
    } = req.query;
    const year = req.query.year || "";
    const limit = 40;
    const offset = Number((page - 1) * limit);
    const currentPage = Math.ceil(offset / limit);

    const signature = `Все ${byType} жанра ${byGenre} за ${year} год`;

    const querySearch = {
      Type: byType,
      Genre: { $regex: byGenre, $options: "i" },
      Year: { $regex: year, $options: "i" }
    };

    // eslint-disable-next-line func-names

    const data = moviesModel
      .where(querySearch)
      .select({
        Released: 1, Title: 1, Poster: 1, Year: 1, Genre: 1
      })
      .sort({ [sortedBy]: -1 })
      .exec();

    const dataCount = moviesModel
      .countDocuments(querySearch)
      .exec();

    Promise.all([data, dataCount])
      .then(result => {
        res.set("Cache-Control", "public, max-age=31557600");
        res.json({ result, signature, currentPage });
      })
      .catch((err) => {
        console.error('err',err);
        return res.sendStatus(404);
      });
  });

  return router;
};

module.exports = filterFormRouter;
