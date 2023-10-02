const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    minlength: 3,
    maxlength: 500,
    required: true,
  },
  deliveryMode: {
    type: String,
    minlength: 3,
    maxlength: 500,
    required: true,
  },
  deliveryAddress: {
    type: String,
    minlength: 3,
    maxlength: 500,
    required: true,
  },
  paymentMethod: {
    type: String,
    minlength: 3,
    maxlength: 500,
    required: true,
  },
  paymentStatus: {
    type: String,
    minlength: 3,
    maxlength: 500,
    required: true,
  },
  transactionId: {
    type: String,
    minlength: 3,
    maxlength: 500,
    required: true,
  },
  unit: {
    type: String,
    minlength: 3,
    maxlength: 500,
    required: true,
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

const Order = mongoose.model("Order", orderSchema);

exports.orderSchema = orderSchema;
exports.Order = Order;
