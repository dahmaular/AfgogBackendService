const mongoose = require("mongoose");

const propCategorySchema = new mongoose.Schema({
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

const PropCategory = mongoose.model('Property_Category', propCategorySchema);

exports.propCategorySchema = propCategorySchema;
exports.PropCategory = PropCategory;