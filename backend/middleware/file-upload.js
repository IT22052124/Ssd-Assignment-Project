const multer = require("multer");
const { v1: uuidv1 } = require("uuid");
const fs = require("fs");

// Allowed MIME types
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

// Magic numbers for PNG and JPEG
const MAGIC_NUMBERS = {
  png: Buffer.from([0x89, 0x50, 0x4e, 0x47]),
  jpeg: Buffer.from([0xff, 0xd8, 0xff]),
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images");
  },
  filename: (req, file, cb) => {
    const ext = MIME_TYPE_MAP[file.mimetype];
    const uniqueName = `${uuidv1()}-${Date.now()}.${ext}`;
    cb(null, uniqueName);
  },
});

const fileupload = multer({
  limits: 500000,
  storage,
  fileFilter: (req, file, cb) => {
    const ext = MIME_TYPE_MAP[file.mimetype];
    if (!ext) {
      return cb(new Error("Invalid file type"), false);
    }

    cb(null, true);
  },
});

// Middleware to check magic number after saving
fileupload.checkMagic = (req, res, next) => {
  if (!req.file) return next();

  const ext = MIME_TYPE_MAP[req.file.mimetype];
  const magic = MAGIC_NUMBERS[ext];

  fs.open(req.file.path, "r", (err, fd) => {
    if (err) return next(err);

    const buffer = Buffer.alloc(magic.length);
    fs.read(fd, buffer, 0, magic.length, 0, (err) => {
      fs.close(fd, () => {});
      if (err) return next(err);

      if (!buffer.equals(magic)) {
        // Delete fake file
        fs.unlink(req.file.path, () => {});
        return next(new Error("File content does not match its extension"));
      }

      next();
    });
  });
};

module.exports = fileupload;
