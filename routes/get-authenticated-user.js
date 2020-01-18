const express = require("express");
const router = express.Router();

module.exports = function() {
  router.get("/authenticated-user", (req, res) => {
    res.setHeader("Cache-control", "no-cache, no-store, must-revalidate");
    if (req.user._doc.password) {
      delete req.user._doc.password;
    }
    res.json(req.user);
  });
  return router;
};
