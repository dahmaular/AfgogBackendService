const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");

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
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
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
