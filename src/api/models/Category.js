const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
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

const Category = mongoose.model('Category', categorySchema);

exports.categorySchema = categorySchema;
exports.Category = Category;