const config = require('config');const firebase = require("firebase");
const firebaseConfig = {
  apiKey: config.get("apiKey"),
  authDomain: config.get("authDomain"),
  projectId: config.get("projectId"),
  storageBucket: config.get("storageBucket"),
  messagingSenderId: config.get("messagingSenderId"),
  appId: config.get("appId"),
};

module.exports = firebase.initializeApp(firebaseConfig);

// export default {
//   firebaseConfig: {
//     apiKey: config.get("apiKey"),
//     authDomain: config.get("authDomain"),
//     projectId: config.get("projectId"),
//     storageBucket: config.get("storageBucket"),
//     messagingSenderId: config.get("messagingSenderId"),
//     appId: config.get("appId"),
//   },
// };
