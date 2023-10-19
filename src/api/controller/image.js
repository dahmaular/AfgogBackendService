require("dotenv").config();
const _ = require("lodash");
const multer = require("multer");
// const config = require("../../config/firebase");
// const {
//   getStorage,
//   ref,
//   getDownloadURL,
//   uploadBytesResumable,
// } = require("firebase/storage");
// const { initializeApp } = require("firebase/app");

const { uploadFile, getFileStream } = require("../../s3/s3");

// initializeApp(config.firebaseConfig);

// const storage = getStorage();

const upload = multer({ storage: multer.memoryStorage() });

// var admin = require("firebase-admin");
const admin = require('firebase-admin');

const serviceAccount = require("./afgog.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-project-1-58a04.firebaseio.com",
  storageBucket: process.env.BUCKET_URL,
});

const storage = admin.storage();

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
    throw error;
  }
};

exports.getUploadedImage = async (req, res) => {
  console.log(req.params);
  const key = req.params.key;
  const readStream = await getFileStream(key);
  console.log("read", readStream);
  //   const url = await readStream.pipe(res)
};

exports.getFBUImageUpload = async (req, res) => {
  let db = admin.firestore();

  let a = db.collection("products");

  let docRef = a.doc(req.body.fileName);
  await docRef.set({
    hobby: req.body.user.hobby,
    age: req.body.user.age,
  });
  res.send("done");
};
