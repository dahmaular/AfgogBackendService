const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  amount: {
    type: String,
    minlength: 3,
    maxlength: 500,
    required: true,
  },
  count: {
    type: Number,
    minlength: 3,
    maxlength: 500,
    required: true,
  }
});

const Cart = mongoose.model('Cart', cartSchema);

exports.cartSchema = cartSchema;
exports.Cart = Cart;
