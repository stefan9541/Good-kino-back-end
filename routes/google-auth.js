const express = require("express");
const router = express.Router();
const passport = require("passport");
const url =
  process.env.NODE_ENV === "production"
    ? "https://good-kino-e6706.firebaseapp.com/"
    : "http://localhost:3000/";

module.exports = () => {
  router.get(
    "/google-auth",
    passport.authenticate("google", {
      scope: ["openid", "profile"]
    })
  );

  router.get(
    "/google/redirect",
    passport.authenticate("google", {
      failureRedirect: "/api/logout"
    }),
    (req, res) => {
      res.redirect(req.header("Referer") || url);
    }
  );

  return router;
};
