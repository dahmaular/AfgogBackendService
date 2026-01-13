const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    minlength: 3,
    maxlength: 500,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    minlength: 3,
    maxlength: 255,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    minlength: 3,
    maxlength: 255,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024,
  },
  status: {
    type: String,
    enum: ["Pending", "Active"],
    default: "Pending",
  },
  confirmationCode: {
    type: String,
    unique: true,
  },
  isAgent: {
    type: Boolean,
    default: false
  },
  agencyName: {
    type: String,
    maxlength: 1024,
  },
  isRealEstate: {
    type: Boolean,
    default: false
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpire: {
    type: Date,
  }
  
});

userSchema.methods.generateAuthToken = function (user) {
  const jwtKey = process.env.afgog_jwtPrivateKey || config.get("jwtPrivateKey");
  const token = jwt.sign({ user }, jwtKey, {
    expiresIn: "2h",
  });
  return token;
};

const User = mongoose.model("User", userSchema);

exports.User = User;
exports.userSchema = userSchema;
