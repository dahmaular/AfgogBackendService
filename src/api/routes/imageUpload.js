const express = require("express");
const router = express.Router();

require("dotenv").config();
const multer = require("multer");
// Import the Firebase Admin SDK
const admin = require("firebase-admin");

const upload = multer({ storage: multer.memoryStorage() });

// Initialize the Firebase Admin SDK with your service account credentials
const serviceAccount = require("../../../afgog.json"); // Update this path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-project-1-58a04.firebaseio.com",
  storageBucket: "afgog-1a208.appspot.com",
});

// Get a reference to the Firebase Storage
const storage = admin.storage();

// Example 1: Uploading a file to Firebase Storage
const bucket = storage.bucket(); // Reference to the root of your storage bucket

const localFilePath = "path-to-local-file.jpg"; // Path to the local file you want to upload
const remoteFileName = "uploaded-file.jpg"; // Name for the file in Firebase Storage

router.post("/", upload.single("image"), async (req, res) => {
    const dateTime = giveCurrentDateTime();
  console.log(req.file);
  const file = bucket.file(req.file.originalname + date);

  file
    .createWriteStream()
    .on("error", (error) => {
      console.error("Error uploading file:", error);
    })
    .on("finish", () => {
      console.log("File uploaded successfully.");
    })
    .end(require("fs").readFileSync(req.file));

  // Example 2: Downloading a file from Firebase Storage
  const downloadLocalPath = "path-to-save-downloaded-file.jpg"; // Path to save the downloaded file

  const imageUrl = file
    .createReadStream()
    .on("error", (error) => {
      console.error("Error downloading file:", error);
    })
    .on("end", () => {
      console.log("File downloaded successfully.");
    })
    .pipe(require("fs").createWriteStream(downloadLocalPath));

  console.log(imageUrl);

  // Example 3: Deleting a file from Firebase Storage
  //   file
  //     .delete()
  //     .then(() => {
  //       console.log("File deleted successfully.");
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting file:", error);
  //     });
});

const giveCurrentDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;
  return dateTime;
};

module.exports = router;
