const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1024
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

const Brand = mongoose.model('Brand', brandSchema);

exports.brandSchema = brandSchema;
exports.Brand = Brand;