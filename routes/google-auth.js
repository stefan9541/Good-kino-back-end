const express = require("express");
const router = express.Router();
const passport = require("passport");

module.exports = () => {
  router.get("/google-auth", passport.authenticate("google", {
    scope: ["openid", 'profile'],
  }));

  router.get('/google/redirect',
    passport.authenticate('google', {
      failureRedirect: "/api/logout"
    }), (req, res) => {
      res.redirect(req.headers.referer);
    });

  return router;
}
