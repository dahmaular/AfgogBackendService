require("dotenv").config();
const _ = require("lodash");
const multer = require("multer");

const { uploadFile, getFileStream } = require("../../s3/s3");

exports.uploadImage = async (req, res) => {
//   console.log("re", req.file);
  const file = req.file;
  try {
    const uploadResult = await uploadFile(file);
    const image = { imageUrl: `/images/${uploadResult.Key}` };
    if (uploadResult.Key) {
        const readStream = await getFileStream(uploadResult.Key);
        message = "Image uploaded successfully";
        res.json({ imageUrl: readStream, message, isSuccess: true });
    }
  } catch (error) {
    throw error
  }
};

exports.getUploadedImage = async (req, res) => {
  console.log(req.params);
  const key = req.params.key;
  const readStream = await getFileStream(key);
  console.log("read", readStream);
  //   const url = await readStream.pipe(res)
};
