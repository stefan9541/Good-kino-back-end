const express = require("express");
const { ObjectId } = require("mongoose").Types;

const router = express.Router();
const commentariesModel = require("../models/commentaries");
const userIsAuthenticated = require("../middleware/user-is-authenticated");

module.exports = () => {
  router.get("/get-commentaries", (req, res) => {
    commentariesModel.
      aggregate()
      .match({ movieId: ObjectId(req.query.movieId) })
      .lookup({
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author"
      })
      .unwind("author")
      .project({
        _id: 1,
        likes: 1,
        dislikes: 1,
        body: 1,
        createdAt: 1,
        author: {
          userName: 1,
          picture: 1,
        }
      })
      .exec()
      .then(commentaries => {
        commentaries.reverse();
        res.json(commentaries);
      });
  })


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

  router.patch("/commentaries/update/likes", userIsAuthenticated, (req, res, next) => {
    const { commentariesId, isLiked } = req.body;
    const { _id: userId } = req.user;
    if (isLiked) {
      commentariesModel.findByIdAndUpdate(commentariesId,
        {
          $pull: { likes: userId }
        })
        .exec()
        .then(() => res.sendStatus(200))
        .catch((err) => next(err));
      return;
    }
    commentariesModel.findByIdAndUpdate(commentariesId,
      {
        $addToSet: { likes: userId },
        $pull: { dislikes: userId }
      })
      .exec()
      .then(() => res.sendStatus(200))
      .catch((err) => next(err))
  });

  router.patch("/commentaries/update/dislikes", userIsAuthenticated, (req, res, next) => {
    const { commentariesId, isDislike } = req.body;
    const { _id: userId } = req.user;
    if (isDislike) {
      commentariesModel.findByIdAndUpdate(commentariesId,
        {
          $pull: { dislikes: userId }
        })
        .exec()
        .then(() => res.sendStatus(200))
        .catch((err) => next(err));
      return;
    }
    commentariesModel.findByIdAndUpdate(commentariesId,
      {
        $addToSet: { dislikes: userId },
        $pull: { likes: userId }
      })
      .exec()
      .then(() => res.sendStatus(200))
      .catch((err) => next(err))
  });

  return router;
};
