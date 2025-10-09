const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 500,
  },
  otp: {
    type: String,
    unique: true,
  },
  expiry: {
    type: Date,
    default: Date.now(),
    expires: '4m',
  },
  status: {
    type: String,
    enum: ["Pending", "Used"],
    default: "Pending",
  },
});

const Otp = mongoose.model("Otp", otpSchema);

exports.otpSchema = otpSchema;
exports.Otp = Otp;
