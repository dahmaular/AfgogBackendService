const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const vendorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 3,
    maxlength: 500,
    required: true,
  },
  lastName: {
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
  storeName: {
    type: String,
    minlength: 5,
    maxlength: 255,
  },
  businessAddress: {
    type: String,
    minlength: 5,
    maxlength: 255,
  },
  businessType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BusinessType",
  },
  bankName: {
    type: String,
    minlength: 5,
    maxlength: 255,
  },
  accountNumber: {
    type: String,
    minlength: 5,
    maxlength: 255,
  },
  bvn: {
    type: String,
    minlength: 5,
    maxlength: 255,
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  },
  dateModified: {
    type: Date,
    default: Date.now()
  }
});

vendorSchema.methods.generateAuthToken = function (vendor) {
  const token = jwt.sign({ vendor }, config.get("jwtPrivateKey"), {
    expiresIn: "2h",
  });
  return token;
};

const Vendor = mongoose.model("Vendor", vendorSchema);

exports.Vendor = Vendor;
exports.vendorSchema = vendorSchema;
