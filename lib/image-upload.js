const path = require("path");
const multer = require("multer");
const userModel = require("../models/user");
const mkdirp = require("mkdirp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { _id: userId = "" } = req.user;
    const dir = `uploads/${userId}`;
    mkdirp(dir, err => cb(err, dir));
  },
  filename: async (req, file, cb) => {
    const { _id: userId } = req.user;
    const fileName = Date.now().toString(36) + path.extname(file.originalname);
    const user = await userModel.findById(userId);

    if (!user) {
      const error = new Error();
      error.message = "no user plz authorize or register";
      error.code = "NO_USER";
      return cb(error);
    }

    cb(null, fileName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      const err = new Error();
      err.message = "valid format is jpg and png only";
      err.code = "EXTENTION";
      return cb(err);
    }
    cb(null, true);
  }
}).single("avatar");

module.exports = upload;
