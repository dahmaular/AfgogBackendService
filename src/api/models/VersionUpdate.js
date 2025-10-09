const mongoose = require("mongoose");

const appVersionSchema = new mongoose.Schema({
  ios: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 1024,
  },
  android: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 1024,
  },
});

const AppVersion = mongoose.model("AppVersion", appVersionSchema);

exports.appVersionSchema = appVersionSchema;
exports.AppVersion = AppVersion;
