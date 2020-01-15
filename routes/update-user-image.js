const expess = require("express");
const router = expess.Router();
const upload = require("../lib/image-upload");
const userModel = require("../models/user");
const cloudinaryUpload = require("../lib/cloudinary-module");

module.exports = function() {
  router.post("/update/avatar", (req, res, next) => {
    upload(req, res, err => {
      const { _id: userId } = req.user;
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json(err);
        }
        if (err.code === "EXTENTION") {
          return res.status(400).json(err);
        }
        if (err.code === "NO_USER") {
          return res.status(400).json(err);
        }
      }
      if (!req.file) {
        const error = new Error();
        error.message = "input can not be empty";
        return res.status(400).json(error);
      }
      const { path } = req.file;
      cloudinaryUpload
        .upload(path, userId)
        .then(({ url, public_id }) => {
          cloudinaryUpload.deleteImageFromDiskStorage(path);
          return { url, public_id };
        })
        .then(({ url, public_id }) => {
          userModel
            .findByIdAndUpdate(userId, {
              picture: url,
              publicAvatarId: public_id
            })
            .exec();
          return url;
        })
        .then(url => res.status(200).json({ url }))
        .catch(err => next(err));
    });
  });
  return router;
};
