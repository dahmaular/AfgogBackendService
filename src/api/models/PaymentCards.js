const mongoose = require("mongoose");

const paymentCardSchema = new mongoose.Schema({
  cardName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1024,
  },
  cardNumber: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1024,
  },
  expiry: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1024,
  },
  cvv: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1024,
  },
  type: {
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

const PaymentCard = mongoose.model("PaymentCard", paymentCardSchema);

exports.paymentCardSchema = paymentCardSchema;
exports.PaymentCard = PaymentCard;