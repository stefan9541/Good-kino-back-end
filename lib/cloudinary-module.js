const { uploader } = require("cloudinary").v2;
const fs = require("fs");

const cloudinaryUpload = (function() {
  return {
    deleteImageFromDiskStorage: function(imagePath) {
      fs.unlink(imagePath, function(err) {
        if (err) throw err;
      });
    },

    deleteImageFromCloudinary: function(imagePath) {
      return uploader.destroy(imagePath);
    },

    upload: function(imagePath, userId) {
      return uploader.upload(imagePath, {
        folder: `Good_kino/uploads/${userId}`,
        quality: "auto:best",
        width: 100,
        height: 100,
        crop: "fill",
        gravity: "face"
      });
    }
  };
})();

module.exports = cloudinaryUpload;
