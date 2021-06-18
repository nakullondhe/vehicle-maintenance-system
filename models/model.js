const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref : "Company",
  },
  service: [
    {
      range: {
        type: Number,
        required: true
      },
      duration: {
        type: Number,
        required: true
      }
    },
  ]
});

module.exports = mongoose.model("Model", modelSchema);