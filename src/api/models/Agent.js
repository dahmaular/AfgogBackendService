const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const agentSchema = new mongoose.Schema({
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
  address: {
    type: String,
    minlength: 5,
    maxlength: 255,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  dateModified: {
    type: Date,
    default: Date.now(),
  },
});

agentSchema.methods.generateAuthToken = function (agent) {
  const token = jwt.sign({ agent }, config.get("jwtPrivateKey"), {
    expiresIn: "2h",
  });
  return token;
};

const Agent = mongoose.model("Agent", agentSchema);

exports.Agent = Agent;
exports.agentSchema = agentSchema;
