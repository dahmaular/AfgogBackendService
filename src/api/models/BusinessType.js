const mongoose = require("mongoose");

const businessTypeSchema = new mongoose.Schema({
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

const BusinessType = mongoose.model('BusinessType', businessTypeSchema);

exports.businessTypeSchema = businessTypeSchema;
exports.BusinessType = BusinessType;