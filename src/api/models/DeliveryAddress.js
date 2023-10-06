const mongoose = require("mongoose");

const deliveryAddressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1024,
  },
  phoneNumber: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1024,
  },
  city: {
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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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

const DeliveryAddress = mongoose.model(
  "DeliveryAddress",
  deliveryAddressSchema
);

exports.deliveryAddressSchema = deliveryAddressSchema;
exports.DeliveryAddress = DeliveryAddress;
