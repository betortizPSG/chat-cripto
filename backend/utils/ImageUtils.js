const path = require("path");

class ImageUtils {
  imageValidator(files) {
    if (files.image) {
      const getImageName = files.image.originalFilename;
      const formatFile =
        getImageName.split(".")[getImageName.split(".").length - 1];
      const newNameImage = `${new Date().getTime()}.${formatFile}`;
      const newPath = path.resolve(
        __dirname,
        "..",
        "public",
        "image",
        `${newNameImage}`
      );
      return { newPath, newNameImage };
    } else {
      return { newPath: null, newNameImage: null };
      s;
    }
  }
}

module.exports = ImageUtils;
