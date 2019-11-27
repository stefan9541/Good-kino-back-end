const express = require("express")
const router = express.Router();

module.exports = function () {
  router.get("/authenticated-user", (req, res) => {
    if (req.user._doc.password) {
      delete req.user._doc.password;
    };
    res.json(req.user);
  });
  return router
}