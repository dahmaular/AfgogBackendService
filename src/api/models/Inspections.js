const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const inspectSchema = new mongoose.Schema({
  inspector: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true,
  },
  inpectionDate: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true
  },
  inspectionTime: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
});

inspectSchema.methods.generateAuthToken = function (user) {
  const jwtKey = process.env.afgog_jwtPrivateKey || config.get("jwtPrivateKey");
  const token = jwt.sign({ user }, jwtKey, {
    expiresIn: "2h",
  });
  return token;
};

const Inspection = mongoose.model("Inspections", inspectSchema);

exports.Inspection = Inspection;
exports.inspectSchema = inspectSchema;
