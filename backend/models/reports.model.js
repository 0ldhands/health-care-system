const mongoose = require('mongoose');

const reportsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: false
  },
  data: {
    type: Object, // Can store nutrition, BMI, women health, or any structured info
    required: false
  },
  file: String
}, { timestamps: true });

module.exports = mongoose.model('Reports', reportsSchema);