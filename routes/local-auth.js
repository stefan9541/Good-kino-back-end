const express = require("express");
const router = express.Router();
const UserModel = require("../models/user");
const bcrypt = require("bcryptjs");
const passport = require("passport");

module.exports = function () {
  router.post("/register", (req, res, next) => {
    const {
      email,
      password,
      confirm,
      userName
    } = req.body;

    if (!email || !password || !userName) {
      return res.sendStatus(400);
    }
    if (confirm !== password) {
      return res.sendStatus(400);
    }

    bcrypt.genSalt(10)
      .then(genSalt => genSalt)
      .then(salt =>
        bcrypt.hash(password, salt)
      )
      .then(hashPasword =>
        new UserModel({
          email,
          userName,
          password: hashPasword
        }).save()
      )
      .then(user => res.sendStatus(200))
      .catch(err => {
        if (err.code === 11000) {
          return res.status(400).json({
            status: "false",
            message: "this email already used"
          });
        }
        return next(err);
      })
  });

  router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(400).json({
          status: "false",
          message: "Введен неверный логин или пароль"
        })
      }
      console.log('5555555555555',user);

      req.logIn(user, function (err) {
        if (err) { return next(err); }
        res.status(200).json(user)
      })
    })(req, res, next);
  });

  return router
}