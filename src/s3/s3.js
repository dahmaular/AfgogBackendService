const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");
const stream = require("stream");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3({
  region,
  secretAccessKey,
  accessKeyId,
});

function uploadFile(file) {
  // Handle both disk storage (local) and memory storage (Vercel)
  let fileBody;
  
  if (file.path) {
    // File is on disk (local development)
    fileBody = fs.createReadStream(file.path);
  } else if (file.buffer) {
    // File is in memory (Vercel/production)
    fileBody = file.buffer;
  } else {
    throw new Error('Invalid file object - no path or buffer found');
  }

  const uploadParams = {
    Bucket: bucketName,
    Body: fileBody,
    Key: file.filename || file.originalname,
    ContentType: file.mimetype,
  };

  return s3.upload(uploadParams).promise();
}
exports.uploadFile = uploadFile;

function getFileStream(fileKey) {
  const neverExpireTime = 3153600000;
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
    Expires: neverExpireTime,
  };

  // return s3.getObject(downloadParams).createReadStream();
  return s3.getSignedUrlPromise('getObject', downloadParams)
}
exports.getFileStream = getFileStream;
