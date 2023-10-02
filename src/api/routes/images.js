const express = require("express");
const router = express.Router();

const multer = require("multer");
const { uploadImage, getUploadedImage } = require("../controller/image");
const upload = multer({dest: 'uploads/'})


router.post("/", upload.single('image'), (req, res) => {
  // register new user
  // winston.info(req.file);
//   const file = req.file;
//   console.log("imageReq",file);
  uploadImage(req, res);
});

router.get("/:key", (req, res) => {
    // register new user
    // winston.info(req.file);
  //   const file = req.file;
  //   console.log("imageReq",file);
    getUploadedImage(req, res);
  });

module.exports = router;
