const express = require("express");
const { ObjectId } = require("mongoose").Types;

const router = express.Router();
const commentariesModel = require("../models/commentaries");


module.exports = () => {
  router.get("/get-commentaries", (req, res) => {
    commentariesModel.find({
      movieId: ObjectId(req.query.movieId)
    })
      .populate({
        path: "author",
        select: {
          picture: 1,
          userName: 1
        }
      })
      .then(commentaries => {
        commentaries.reverse();
        res.json(commentaries);
      });
  });

  router.post("/post-commentaries", (req, res) => {
    const { _id: author } = req.user;
    const { commentText: body, movieId } = req.body;
    const commentar = new commentariesModel({
      body,
      movieId,
      author
    });
    commentar.save()
      .then(comment => {
        res.json(comment);
      })
      .catch(err => res.sendStatus(403));
  });

  return router;
};
