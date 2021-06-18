const mongoose = require('mongoose');

const uservehicle = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  purchaseDate: {
    type: Date,
    required: true,
  },
  range: {
    type: Number,
    required: true,
  },
  numberOfService: {
    type: Number,
    required:  true,
  },
  lastService: Date,
  nextService: Date,
  registration: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model("UserVehicle", uservehicle);