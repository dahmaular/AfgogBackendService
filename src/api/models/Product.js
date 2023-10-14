const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1024,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
  },
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
  },
  description: {
    type: String,
    minlength: 3,
    maxlength: 1024,
  },
  specification: {
    type: String,
    minlength: 3,
    maxlength: 1024,
  },
  image: {
    type: Array,
  },
  amount: {
    type: String,
    minlength: 3,
    maxlength: 255,
  },
  price: {
    type: String,
    minlength: 3,
    maxlength: 255,
  },
  rating: {
    type: String,
    minlength: 3,
    maxlength: 255,
  },
  color: {
    type: String,
    minlength: 3,
    maxlength: 255,
  },
  size: {
    type: Array,
  },
  noOfItems: {
    type: String,
    minlength: 1,
  },
  type: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true
  },
  availability: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true
  },
  sold: {
    type: String,
    minlength: 3,
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

const Product = mongoose.model('Product', productSchema);

exports.productSchema = productSchema;
exports.Product = Product;