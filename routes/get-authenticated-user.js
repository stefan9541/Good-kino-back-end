const express = require("express")
const router = express.Router();

module.exports = function () {
  router.get("/authenticated-user", (req, res) => {
    res.json(req.user);
  });
  return router
}