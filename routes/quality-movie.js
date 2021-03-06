const express = require("express");

const router = express.Router();
const multimediaModel = require("../models/multimedia");
const { ObjectId } = require("mongoose").Types;

const qualityMovie = () => {
  router.get("/current-quality", (req, res) => {
    const { movieId, quality } = req.query;
    multimediaModel.findOne({
      // owner: ObjectId(movieId),
      quality
    }, (err, data) => {
      res.json(data);
    });
  });

  return router;
};

module.exports = qualityMovie;
