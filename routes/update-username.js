const express = require("express");
const router = express.Router();
const userModel = require("../models/user");

module.exports = function() {
  router.patch("/update/username", (req, res, next) => {
    const { username } = req.body;
    const { _id: userId } = req.user;
    if (!username.trim()) {
      return res.status(400).json({ message: "username can not be empty" });
    } else if (username.length < 4) {
      return res.status(400).json({ message: "at least 4 characters" });
    } else if (username.length > 16) {
      return res.status(400).json({ message: "not more than 16 characters" });
    }
    userModel
      .findByIdAndUpdate(userId, { userName: username })
      .exec()
      .then(() => res.sendStatus(200))
      .catch(err => next(err));
  });
  return router;
};
