const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    // unique: true
  },
  registration: {
    type: String,
    required: true,
    // unique: true
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
  ],
  contact: {
    type: String,
    required: true,
    // unique: true
  },
  country: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Company", companySchema);