const express = require("express");
const router = express.Router();
const passport = require("passport");

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
      res.redirect(req.header("Referer") || "http://localhost:3000/");
    }
  );

  return router;
};
