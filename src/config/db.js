const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');


module.exports = function() {
  const db = process.env.MONGODB_URI || config.get('db');
  mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => winston.info(`Connected to MongoDB...`))
    .catch(err => winston.error(`MongoDB connection error: ${err.message}`));
}