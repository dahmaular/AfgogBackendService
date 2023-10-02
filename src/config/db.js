const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

const firebase = require('firebase');
const firebaseConfig = {
  apiKey: config.get('apiKey'),
  authDomain: config.get('authDomain'),
  projectId: config.get('projectId'),
  storageBucket: config.get('storageBucket'),
  messagingSenderId: config.get('messagingSenderId'),
  appId: config.get('appId')
  }

module.exports = firebase.initializeApp(firebaseConfig);

module.exports = function() {
  const db = config.get('db');
  mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => winston.info(`Connected to ${db}...`));
}