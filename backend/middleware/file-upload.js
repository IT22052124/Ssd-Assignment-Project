const multer = require("multer");
const { v1: uuidv1 } = require('uuid');

const MiME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const fileupload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
      const ext = MiME_TYPE_MAP[file.mimetype];
      cb(null, uuidv1() + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MiME_TYPE_MAP[file.mimetype]
    let error = isValid ? null : console.log(isValid)
    cb(error, isValid);
  }
});

module.exports = fileupload;
