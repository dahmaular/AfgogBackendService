const mongoose = require("mongoose");

const lgaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "State",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index to ensure unique LGA names within each state
lgaSchema.index({ name: 1, state: 1 }, { unique: true });

const LGA = mongoose.model("LGA", lgaSchema);

exports.LGA = LGA;
