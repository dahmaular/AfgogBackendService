const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1024,
  },
  address: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1024,
  },
  images: {
    type: Array,
    required: true,
  },
  type: {
    type: String,
    minlength: 3,
    maxlength: 1024,
  },
  condition: {
    type: String,
    minlength: 3,
    maxlength: 1024,
  },
  size: {
    type: String,
    minlength: 3,
    maxlength: 1024,
  },
  description: {
    type: String,
    minlength: 3,
    maxlength: 1024,
  },
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property_Category",
    required: true,
  },
  bedroom: {
    type: String,
    minlength: 1,
    maxlength: 1024,
  },
  bathroom: {
    type: String,
    minlength: 1,
    maxlength: 1024,
  },
  facilities: {
    type: String,
    minlength: 3,
    maxlength: 1024,
  },
  price: {
    type: String,
    minlength: 3,
    maxlength: 1024,
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

const Property = mongoose.model("Property", propertySchema);

exports.propertySchema = propertySchema;
exports.Property = Property;
