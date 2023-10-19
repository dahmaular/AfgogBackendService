// const express = require("express");
// const router = express.Router();

// const {
//   getStorage,
//   ref,
//   getDownloadURL,
//   uploadBytesResumable,
// } = require("firebase/storage");
// const { initializeApp } = require("firebase/app");

// const config = require("../../config/firebase");

// const multer = require("multer");
// // const { uploadImage, getUploadedImage } = require("../controller/image");
// // const upload = multer({dest: 'uploads/'})

// // initializeApp(config.firebaseConfig);

// // Initialize Cloud Storage and get a reference to the service
// // const storage = getStorage();

// const upload = multer({ storage: multer.memoryStorage() });

// router.post("/", upload.single("image"), async (req, res) => {
//   // register new user
//   // winston.info(req.file);
//   //   const file = req.file;
//   //   console.log("imageReq",file);
//   // Upload to s3 bucket
//   // uploadImage(req, res);

//   // Upload to firebase storage
//   try {
//     const dateTime = giveCurrentDateTime();

//     const storageRef = ref(
//       storage,
//       `files/${req.file.originalname + "       " + dateTime}`
//     );

//     // Create file metadata including the content type
//     const metadata = {
//       contentType: req.file.mimetype,
//     };

//     // Upload the file in the bucket storage
//     const snapshot = await uploadBytesResumable(
//       storageRef,
//       req.file.buffer,
//       metadata
//     );
//     //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

//     // Grab the public url
//     const downloadURL = await getDownloadURL(snapshot.ref);

//     console.log("File successfully uploaded.");
//     return res.send({
//       message: "file uploaded to firebase storage",
//       name: req.file.originalname,
//       type: req.file.mimetype,
//       downloadURL: downloadURL,
//     });
//   } catch (error) {
//     return res.status(400).send(error.message);
//   }
// });

// router.get("/:key", (req, res) => {
//   // register new user
//   // winston.info(req.file);
//   //   const file = req.file;
//   //   console.log("imageReq",file);
//   getUploadedImage(req, res);
// });

// const giveCurrentDateTime = () => {
//   const today = new Date();
//   const date =
//     today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
//   const time =
//     today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//   const dateTime = date + " " + time;
//   return dateTime;
// };

// module.exports = router;
